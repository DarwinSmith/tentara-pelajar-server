'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Profile endpoint : ', () => {

  let profile = {
    userId: 'weufFirebaseUID',
    schoolId: 1,
    fullname: 'Andrea Jonathan',
    phone: '0812353982384',
    experience: 'Bermain & Belajar',
    activity: 'Berenang'
  }

  it('Expect return created data with same value and id', (done) => {
    api.post('/profiles')
    .send(profile)
    .end((err, res) => {
      if (err) return done(err)
      var resProfile = res.body
      expect(resProfile.fullname).to.be.equal(profile.fullname)
      expect(resProfile.phone).to.be.equal(profile.phone)
      expect(resProfile.experience).to.be.equal(profile.experience)
      expect(resProfile.activity).to.be.equal(profile.activity)
    })
    done()
  })

  it('Expect return one new profile created before accessing endpoint /profiles/:id', (done) => {
    api.get('/profiles')
    .end((err, res) => {
      if (err) done(err)
      let resProfile = res.body[res.body.length]
      expect(profile.fullname).to.be.equal(profile.fullname)
      expect(profile.phone).to.be.equal(profile.phone)
      expect(profile.experience).to.be.equal(profile.experience)
      expect(profile.activity).to.be.equal(profile.activity)
    })
    done()
  })


  it('Expect return one profile data with new value', (done) => {
    api.get('/profiles')
    .end((err, res) => {
      if(err) done(err)
      let resProfile = res.body[res.body.length]

      api.post('/profiles/' + resProfile.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newProfile = {
        userId: 'FirebaseUUID',
        schoolId: 1,
        fullname: 'Andrea J',
        phone: '0889969934345',
        experience: 'Bermain',
        activity: 'Berenang'
      }
      .send(newProfile)
      .end((err, res) => {
        if (err) return done(err)
        let resProfile = res.body
        expect(profile.fullname).to.be.equal(resProfile.fullname)
        expect(profile.phone).to.be.equal(resProfile.phone)
        expect(profile.experience).to.be.equal(resProfile.experience)
        expect(profile.activity).to.be.equal(resProfile.activity)
      })
    })
    done()
  })

  it('Expect return count 1 and created profile data is deleted', (done) => {
    api.get('/profiles')
    .end((err, res) => {
      if(err) done(err)
      let resProfile = res.body[res.body.length]

      api.delete('/profiles/' + resProfile.id)
      .expect(200)
      .end((err, res) => {
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })

})

describe('Skill endpoint', () => {

  let Skill = {
    name: 'Love Icon',
    icon: 'http://blabla.com'
  }

  it('Expect return created new Skill data with provided value', (done) => {
    api.post('/skills')
    .send(Skill)
    .end((err, res) => {
      if (err) return done(err)
      var resSkill = res.body
      expect(resSkill.name).to.be.equal(Skill.name)
      expect(resSkill.icon).to.be.equal(Skill.icon)
    })
    done()
  })

  it('Expect return one new skill created before accessing endpoint /skills/:id', (done) => {
    api.get('/skills')
    .end((err, res) => {
      if (err) done(err)
      let resSkill = res.body[res.body.length]
      expect(resSkill.name).to.be.equal(Skill.name)
      expect(resSkill.icon).to.be.equal(Skill.icon)
      expect(resSkill.id).to.not.be.null
    })
    done()
  })

  it('Expect return one skill data with new value', (done) => {
    let newSkill = {
      name: 'Bolololo',
      icon: 'http://googogog.com'
    }
    api.get('/skills')
    .end((err, res) => {
      if (err) done(err)
      let resSkill = res.body[res.body.length]
      api.patch('/skills/' + resSkill)
      .send(newSkill)
      .end((err, res) => {
        if (err) done(err)
        let resSkill = res.body[res.body.length]
        expect(resSkill.name).to.be.equal(newSkill.name)
        expect(resSkill.icon).to.be.equal(newSkill.icon)
        expect(resSkill.id).to.not.be.null
      })
    })
    done()
  })

  it('Expect return count 1 and created skill data is deleted', (done) => {
    api.get('/skills')
    .end((err, res) => {
      if (err) done(err)
      let resSkill = res.body[res.body.length]
      api.delete('/skills/' + resSkill.id)
      .expect(200)
      .end((err, res) => {
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })

})
