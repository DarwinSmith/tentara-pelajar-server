'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Personalities endpoint : ', () => {

  // initialize personalities variable, so we can re use again.
  let personality = {
    profileId: 1,
    content: 'Rajin menabung, suka mengaji dan patuh sama orang tua'
  }

  // Create personalities
  it('Expect return created data with same value and id', (done) => {
    api.post('/personalities')
    .send(personality) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      let resPersonality = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resPersonality.profileId).to.be.equal(personality.profileId)
      expect(resPersonality.content).to.be.equal(personality.content)
    })
    done()
  })

  // Get personalities dari endpoint /personalities dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new personalities created before accessing endpoint /personalities/:id', (done) => {
    api.get('/personalities')
    .end((err, res) => {
      if (err) done(err)
      let resPersonality = res.body[res.body.length]
      expect(resPersonality.profileId).to.be.equal(personality.profileId)
      expect(resPersonality.content).to.be.equal(personality.content)
    })
    done()
  })

  // Edit personalities yang tadi dengan ID yang sama. dimana value barunya adalah newPersonality, dan cek return nya
  it('Expect return one personalities data with new value', (done) => {
    api.get('/personalities')
    .end((err, res) => {
      if (err) done(err)
      let resPersonality = res.body[res.body.length]

      api.post('/personalities/' + resPersonality.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newPersonality = {
        profileId: 1,
        content: 'Ini sudah di Edit ya'
      }
      .send(newPersonality)
      .end((err, res) => {
        if (err) return done(err)
        let resPersonality = res.body
        expect(resPersonality.profileId).to.be.equal(newPersonality.profileId)
        expect(resPersonality.content).to.be.equal(newPersonality.content)
      })
    })
    done()
  })

  // Delete Data personality yang kita buat sebelumnya.
  it('Expect return count 1 and created personality data is deleted', (done) => {
    api.get('/personalities')
    .end((err, res) => {
      if (err) done(err)
      let resPersonality = res.body[res.body.length - 1]

      api.delete('/personalities/' + resPersonality.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
