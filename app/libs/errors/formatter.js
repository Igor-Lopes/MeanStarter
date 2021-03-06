const _ = require('lodash')

module.exports = app => {
  const errorFormatter = {}

  errorFormatter.format = err => {
    let response = {}

    if (_.has(err, 'mapped')) {
      response = {
        statusCode: 400,
        errorData: {
          code: 4000,
          errors: err.mapped()
        }
      }
    } else if (
      _.isObject(err) &&
      _.has(err, 'name') &&
      err.name === 'MongoError' &&
      _.has(err, 'code') &&
      err.code === 11000 &&
      _.has(err, 'errmsg')
    ) {
      let value = err.errmsg.substring(
        err.errmsg.lastIndexOf('{') + 1,
        err.errmsg.lastIndexOf('}')
      )

      let key = err.errmsg.match(/(index:.+ dup key)/g)

      err.value = value.replace(/"|:| /g, '')
      err.key = key[0].replace(/index|:|dup|key|_|[0-9]+| /g, '')

      response = {
        statusCode: 422,
        errorData: {
          code: 4200,
          errors: [err.key]
        }
      }
    } else if (
      _.isObject(err) &&
      _.has(err, 'apiError') &&
      _.has(err, 'data')
    ) {
      response = {
        statusCode: 400,
        errorData: {
          code: 4000,
          errors: err.data
        }
      }
    } else {
      response = {
        statusCode: 500,
        errorData: {
          code: 5000
        }
      }
    }

    return response
  }
  return errorFormatter
}
