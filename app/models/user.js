module.exports = app => {
  const mongoose = app.locals.mongoose

  const schema = mongoose.Schema(
    {
      account: {
        local: {
          displayName: {
            type: String
          },
          photo: {
            type: String
          },
          email: {
            type: String,
            index: {
              unique: true,
              partialFilterExpression: {
                'account.local.email': {
                  $type: 'string'
                }
              }
            },
            default: null
          },
          phoneNumber: {
            type: String,
            index: {
              unique: true,
              partialFilterExpression: {
                'account.local.phoneNumber': {
                  $type: 'string'
                }
              }
            },
            default: null
          },
          password: {
            type: String
          },
          isActive: {
            type: Boolean,
            default: false
          },
          token: {
            type: String
          },
          tokenExp: {
            type: Number
          },
          changeRequests: {
            phoneNumber: {
              newNumber: {
                type: String
              },
              token: {
                type: String
              },
              tokenExp: {
                type: Number
              }
            },
            email: {
              newEmail: {
                type: String,
                lowercase: true
              },
              token: {
                type: String
              },
              tokenExp: {
                type: Number
              }
            }
          }
        },
        google: {
          id: {
            type: String
          },
          email: {
            type: String
          },
          displayName: {
            type: String
          },
          photo: {
            type: String
          }
        },
        facebook: {
          id: {
            type: String
          },
          displayName: {
            type: String
          },
          photo: {
            type: String
          },
          email: {
            type: String
          }
        }
      }
    },
    {
      timestamps: true
    }
  )

  return mongoose.model('User', schema)
}
