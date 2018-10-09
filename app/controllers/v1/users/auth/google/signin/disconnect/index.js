const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const User = app.models.user
  const responses = app.libs.responses.users

  controller.disconnect = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let user = req.user

      let query = await User.findOneAndUpdate(
        { 'account.google.id': user.account.google.id },
        {
          $set: {
            'account.google.id': null,
            'account.google.email': null,
            'account.google.displayName': null,
            'account.google.photo': null
          }
        },
        {
          new: true
        }
      ).lean()

      if (query) {
        res.send(responses.getAccount(query))
      } else {
        res.status(404).end()
      }
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
