var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app.js')
should = chai.should()
var config = require('../../config/config.js')
var jwt = require('jsonwebtoken')

var user = {}

chai.use(chaiHttp)

describe('User Account Password Update', function () {
  it('should successfully get a JWT on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'user@email.com',
        'password': 'us3r@2017'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        user.jwt = res.headers.jwt
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function (err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          user._id = decoded._id
          user.jwt = res.headers.jwt
          done()
        })
      })
  })

  it('should fail to update account new password with current password on /users/account/:id/account/password PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'us3r@2017',
        'newPassword': 'us3r@2017'
      })
      .end(function (err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        done()
      })
  })

  it('should fail to update account password with invalid current password on /users/account/:id/account/password PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'us3r',
        'newPassword': 'us3r@2017'
      })
      .end(function (err, res) {
        res.should.have.status(401)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4100)
        done()
      })
  })

  it('should fail to update account new password with weak password on /users/account/:id/account/password PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'us3r@2017',
        'newPassword': 'weak'
      })
      .end(function (err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('newPassword')
        done()
      })
  })

  it('should successfully update account password on /users/account/:id/account/password PUT', function (done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'us3r@2017',
        'newPassword': 'us3r@NeW'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully get a JWT with new password on /users/account/signin POST', function (done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'user@email.com',
        'password': 'us3r@NeW'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        user.jwt = res.headers.jwt
        res.headers.jwt.should.be.a('string')
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function (err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })
})