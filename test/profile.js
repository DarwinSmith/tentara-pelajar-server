'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Profile endpoint : ', () => {

  // initialize profile variable, so we can re use again.
  let profile = {
    userId: 'weufFirebaseUID',
    schoolId: 1,
    fullname: 'Andrea Jonathan',
    phone: '0812353982384',
    experience: 'Bermain & Belajar',
    activity: 'Berenang'
  }

  // Create profile
  it('Expect return created data with same value and id', (done) => {
    api.post('/profiles')
    .send(profile) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resProfile = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resProfile.fullname).to.be.equal(profile.fullname)
      expect(resProfile.phone).to.be.equal(profile.phone)
      expect(resProfile.experience).to.be.equal(profile.experience)
      expect(resProfile.activity).to.be.equal(profile.activity)
    })
    done()
  })

  // Get profile dari endpoint /profiles dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new profile created before accessing endpoint /profiles/:id', (done) => {
    api.get('/profiles')
    .end((err, res) => {
      if (err) done(err)
      let resProfile = res.body[res.body.length]
      expect(resProfile.fullname).to.be.equal(profile.fullname)
      expect(resProfile.phone).to.be.equal(profile.phone)
      expect(resProfile.experience).to.be.equal(profile.experience)
      expect(resProfile.activity).to.be.equal(profile.activity)
    })
    done()
  })

  // Edit profile yang tadi dengan ID yang sama. dimana value barunya adalah newProfile, dan cek return nya
  it('Expect return one profile data with new value', (done) => {
    api.get('/profiles')
    .end((err, res) => {
      if (err) done(err)
      let resProfile = res.body[res.body.length - 1]

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
        console.log(res)
        let resProfile = res.body
        expect(resProfile.fullname).to.be.equal(newProfile.fullname)
        expect(resProfile.phone).to.be.equal(newProfile.phone)
        expect(resProfile.experience).to.be.equal(newProfile.experience)
        expect(resProfile.activity).to.be.equal(newProfile.activity)
      })
    })
    done()
  })

  // Delete Data profile yang kita buat sebelumnya.
  it('Expect return count 1 and created profile data is deleted', (done) => {
    api.get('/profiles')
    .end((err, res) => {
      if (err) done(err)
      let resProfile = res.body[res.body.length - 1]

      api.delete('/profiles/' + resProfile.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
