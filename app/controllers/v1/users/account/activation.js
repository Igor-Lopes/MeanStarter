const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')

module.exports = app => {
  const User = app.models.user
  const random = app.libs.random
  const bcrypt = app.libs.bcrypt.hash
  const broadcast = app.libs.broadcast.auth
  const config = app.locals.config
  const responses = app.libs.responses.users
  const errors = app.errors.custom
  const controller = {}

  controller.setActivationCode = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let code = random.generate(4, 'numeric')

      let user = await User.findById(req.params.id).lean()

      if (!user) {
        res.status(404).end()
      } else if (user.account.isActive) {
        res.status(errors.AUT006.httpCode).send(errors.AUT006.response)
      } else {
        await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.token': await bcrypt.generateHash(code.toString()),
              'account.tokenExp': Date.now() + 300000
            }
          },
          {
            new: true
          }
        ).lean()

        if (process.env.NODE_ENV != 'production') {
          res.set('code', code)
        }

        broadcast.sendCode(
          {
            recipient: user.account.email,
            username: user.account.name,
            code: code
          },
          {
            transport: 'email'
          }
        )

        res.end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  controller.activateUser = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = await User.findById(req.params.id).lean()

      if (user.account.isActive) {
        res.status(errors.AUT006.httpCode).send(errors.AUT006.response)
      } else if (
        user.account.token &&
        (await bcrypt.compareHash(
          req.body.token.toString(),
          user.account.token
        )) &&
        Date.now() < user.account.tokenExp
      ) {
        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'account.token': null,
              'account.tokenExp': null,
              'account.isActive': true
            }
          },
          {
            new: true
          }
        ).lean()

        let token = jwt.sign(
          {
            _id: user._id,
            isActive: user.account.isActive
          },
          config.jwt.jwtSecret,
          {
            expiresIn: '1h'
          }
        )

        res.set('JWT', token)
        res.send(responses.getAccount(user))
      } else {
        res.status(errors.AUT004.httpCode).send(errors.AUT004.response)
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
