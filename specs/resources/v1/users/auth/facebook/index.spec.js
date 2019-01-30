const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = require('chai')

const User = server.models.user

const fbMockProfile = {
  id: 'oauth-test',
  provider: 'facebook-oauth2',
  displayName: 'John Doe',
  emails: [{ value: 'john.doe@email.com' }],
  photos: [
    {
      value: 'https://via.placeholder.com/350x150'
    }
  ]
}

chai.use(chaiHttp)

describe('Facebook OAuth2 - New User', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfile

    done()
  })

  it('should successfully login on /api/v1/users/auth/facebook/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })

  it('should successfully create a new local and facebook account objects with Facebook info', done => {
    User.findOne({
      'account.facebook.id': fbMockProfile.id
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
        result.account.should.have.property('facebook')
        result.account.facebook.should.be.a('object')
        result.account.facebook.should.have.property('id')
        result.account.facebook.id.should.be.eql(fbMockProfile.id)
        result.account.facebook.should.have.property('email')
        result.account.facebook.email.should.be.eql(
          fbMockProfile.emails[0].value
        )
        result.account.facebook.should.have.property('displayName')
        result.account.facebook.displayName.should.be.eql(
          fbMockProfile.displayName
        )
        result.account.facebook.should.have.property('photo')
        result.account.facebook.photo.should.be.eql(
          fbMockProfile.photos[0].value
        )
        done()
      })
  })

  after(done => {
    User.remove({
      'account.facebook.id': fbMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Facebook OAuth2 - Existing Local User Account', () => {
  before(done => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfile

    User.create({
      'account.local.displayName': fbMockProfile.displayName,
      'account.local.email': fbMockProfile.emails[0].value,
      'account.local.photo': fbMockProfile.photos[0].value,
      'account.local.isActive': true
    }).then(result => {
      done()
    })
  })

  it('should successfully login on /api/v1/users/auth/facebook/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })

  it('should successfully add facebook account object to matching local account', done => {
    User.findOne({
      'account.facebook.id': fbMockProfile.id
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
        result.account.should.have.property('facebook')
        result.account.facebook.should.be.a('object')
        result.account.facebook.should.have.property('id')
        result.account.facebook.id.should.be.eql(fbMockProfile.id)
        result.account.facebook.should.have.property('email')
        result.account.facebook.email.should.be.eql(
          fbMockProfile.emails[0].value
        )
        result.account.facebook.should.have.property('displayName')
        result.account.facebook.displayName.should.be.eql(
          fbMockProfile.displayName
        )
        result.account.facebook.should.have.property('photo')
        result.account.facebook.photo.should.be.eql(
          fbMockProfile.photos[0].value
        )
        done()
      })
  })

  after(done => {
    User.remove({
      'account.facebook.id': fbMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Facebook OAuth2 - Update Existing Facebook Object', () => {
  const fbMockProfileUpdated = {
    id: 'oauth-test',
    provider: 'facebook-oauth2',
    displayName: 'John Doe Update',
    emails: [{ value: 'john.doe.update@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150/update'
      }
    ]
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfileUpdated

    User.create({
      'account.local.displayName': fbMockProfile.displayName,
      'account.local.email': fbMockProfile.emails[0].value,
      'account.local.photo': fbMockProfile.photos[0].value,
      'account.local.isActive': true,
      'account.facebook.id': fbMockProfile.id,
      'account.facebook.displayName': fbMockProfile.displayName,
      'account.facebook.email': fbMockProfile.emails[0].value,
      'account.facebook.photo': fbMockProfile.photos[0].value
    }).then(result => {
      done()
    })
  })

  it('should successfully login on /api/v1/users/auth/facebook/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(200)
        res.headers['content-type'].should.be.eql('text/html; charset=utf-8')
        done()
      })
  })

  it('should successfully update facebook account object', done => {
    User.findOne({
      'account.facebook.id': fbMockProfile.id
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
        result.account.should.have.property('facebook')
        result.account.facebook.should.be.a('object')
        result.account.facebook.should.have.property('id')
        result.account.facebook.id.should.be.eql(fbMockProfile.id)
        result.account.facebook.should.have.property('email')
        result.account.facebook.email.should.be.eql(
          fbMockProfileUpdated.emails[0].value
        )
        result.account.facebook.should.have.property('displayName')
        result.account.facebook.displayName.should.be.eql(
          fbMockProfileUpdated.displayName
        )
        result.account.facebook.should.have.property('photo')
        result.account.facebook.photo.should.be.eql(
          fbMockProfileUpdated.photos[0].value
        )
        done()
      })
  })
  after(done => {
    User.remove({
      'account.facebook.id': fbMockProfile.id
    }).then(result => {
      done()
    })
  })
})

describe('Facebook OAuth2 - Error AUTH-007', () => {
  const fbMockProfileDifferentId = {
    id: 'oauth-test-different-id',
    provider: 'facebook-oauth2',
    displayName: 'John Doe',
    emails: [{ value: 'john.doe@email.com' }],
    photos: [
      {
        value: 'https://via.placeholder.com/350x150'
      }
    ]
  }

  before(done => {
    let strategy = server.locals.passport.user._strategies['facebook-oauth2']

    strategy._passAuthentication = true
    strategy._redirectToCallback = true
    strategy._callbackURL = '/users/auth/facebook/oauth2/callback'

    strategy._profile = fbMockProfileDifferentId

    User.create({
      'account.local.displayName': fbMockProfile.displayName,
      'account.local.email': fbMockProfile.emails[0].value,
      'account.local.photo': fbMockProfile.photos[0].value,
      'account.local.isActive': true,
      'account.facebook.id': fbMockProfile.id,
      'account.facebook.displayName': fbMockProfile.displayName,
      'account.facebook.email': fbMockProfile.emails[0].value,
      'account.facebook.photo': fbMockProfile.photos[0].value
    }).then(result => {
      done()
    })
  })

  it('should fail to login on /api/v1/users/auth/facebook/oauth2 GET', done => {
    chai
      .request(server)
      .get('/users/auth/facebook/oauth2')
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-007')
        done()
      })
  })

  after(done => {
    User.remove({
      'account.facebook.id': fbMockProfile.id
    }).then(result => {
      done()
    })
  })
})
