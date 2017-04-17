'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Personalities endpoint: ', () => {

  // initialize personalities variable, so we can re use again.
  let personalities = {
    profileId: 3,
    content: 'Rajin menabung, suka mengaji dan patuh sama orang tua'
  }

  // create personalities
  it('Expect return created data with same value and id', (done) => {
    api.post('/personalities')
    .send(personalities) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err,res) => {
      if (err) return done(err)
      var resPersonalities = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resPersonalities.profileId).to.be.equal(personalities.profileId)
      expect(resPersonalities.content).to.be.equal(personalities.content)
    })
    done()
  })

  // Get personalities dari endpoint /personalities dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new personalities created before accessing endpoint /personalities/:id', (done) => {
    api.get('/personalities/')
    .end((err, res) => {
      if (err) done(err)
      let resPersonalities = res.body[res.body.length]
      expect(resPersonalities.profileId).to.be.equal(personalities.profileId)
      expect(resPersonalities.content).to.be.equal(personalities.content)
    })
    done()
  })

  // Edit personalities yang tadi dengan ID yang sama. dimana value barunya adalah newPersonalities, dan cek return nya
  it('Expect return one personalities data with new value', (done) => {
    api.get('/personalities/')
    .end((err, res) => {
      if (err) done(err)
      let resPersonalities = res.body[res.body.length]

      api.post('/personalities/' + resPersonalities.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newPersonalities = {
        content: 'Ini udah di edit',
      }
      .send(newPersonalities)
      .end((err, res) => {
        if (err) return done(err)
        let resPersonalities = res.body
        expect(resPersonalities.profileId).to.be.equal(personalities.profileId)
        expect(resPersonalities.content).to.be.equal(newPersonalities.content)
      })
    })
    done()
  })

  // Delete Data personalities yang kita buat sebelumnya.
  it('Expect return count 1 and created personalities data is deleted', (done) => {
    api.get('/personalities')
    .end((err, res) => {
      if (err) return done(err)
      let resPersonalities = res.body[res.body.length]
      // console.log('errr', resPersonalities);

      api.delete('/personalities/' + resPersonalities.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })

})
