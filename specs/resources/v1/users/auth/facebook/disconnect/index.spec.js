const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = require('chai')

const User = server.models.user

chai.use(chaiHttp)

describe('Facebook OAuth2 - Disconnect', () => {
  const fbMockProfile = {
    id: 'oauth-test-3',
    provider: 'facebook-oauth2',
    displayName: 'John Doe3',
    emails: [{ value: 'john.doe3@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  before(done => {
    User.findOne({
      'account.local.email': fbMockProfile.emails[0].value
    }).then(result => {
      server.request.user = {
        id: result._id,
        account: {
          facebook: {
            id: fbMockProfile.id
          }
        }
      }
      server.request.user._id = result._id

      server.request.isAuthenticated = function () {
        return true
      }

      done()
    })
  })

  it('should successfully disconnect account on /users/auth/facebook/oauth2/disconnect POST', done => {
    chai
      .request(server)
      .post('/users/auth/facebook/disconnect')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully delete facebook account object', done => {
    User.findOne({
      'account.local.email': fbMockProfile.emails[0].value
    })
      .lean()
      .then(result => {
        result.should.have.property('_id')
        result.should.have.property('account')
        result.account.should.be.a('object')
        result.account.should.have.property('local')
        result.account.local.should.be.a('object')
        result.account.local.should.have.property('email')
        result.account.local.email.should.be.eql(fbMockProfile.emails[0].value)
        result.account.local.should.have.property('displayName')
        result.account.local.displayName.should.be.eql(
          fbMockProfile.displayName
        )
        result.account.local.should.have.property('photo')
        result.account.local.photo.should.be.eql(fbMockProfile.photos[0].value)
        result.account.should.not.have.property('facebook')
        done()
      })
  })
})