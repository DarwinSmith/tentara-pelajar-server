'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Profile endpoint : ', () => {


  it('Expect method GET of profiles/:id endpoint to show one data', (done) => {
    api.get('/profiles')
      .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var profiles = res.body;

        expect(profiles.length).to.be.equal(1);
        done()
      })
  })


  it('Expect method GET of profiles/:id to return response 200 ', (done) => {
    api.get('/profiles/1')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        expect(res.status).to.be.equal(200);
        done()
      })
  })

  it('Expect method GET of profiles/:id/skills to return response 200 ', (done) => {
    api.get('/profiles/1/skills')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        expect(res.status).to.be.equal(200);
        done()
      })
  })

  it('should get all skills of profile with id 1', (done) => {
    api.get('/profiles/1/skills')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        var skills = res.body;

        expect(skills.length).to.be.above(1);
        done();
      })
  })
})
