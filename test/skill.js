'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

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
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
