'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Notification endpoint : ', () => {
  // initialize personalities variable, so we can re use again.

  let notification = {
    verb: '123',
    object: 'ada notifikasi dari teman',
    userId: 1
  }

  it('Expect return created data with same value and id', (done) => {
    api.post('/notifications')
    .send(notification) // .send datanya ada di atas, masing-masing key adalah nama form value nya itu isinya
    .end((err, res) => {
      if (err) return done (err)
      let resNotification = res.body
      // expect balikan dari res.body adalah data yang sudah di create
      expect(resNotification.verb).to.be.equal(notification.verb)
      expect(resNotification.object).to.be.equal(notification.object)
      expect(resNotification.userId).to.be.equal(notification.userId)
    })
    done()
  })

  // GET notification dari endpoint /notifications dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new notifications created before accessing endpoint /notifications/:id', (done) => {
    api.get('/notifications')
    .end((err,res) => {
      if (err) done (err)

      let resNotification = res.body[res.body.length]
      expect(resNotification.verb).to.be.equal(notification.verb)
      expect(resNotification.object).to.be.equal(notification.object)
      expect(resNotification.userId).to.be.equal(notification.userId)
    })
    done()
  })

  // Edit notification yang tadi dengan ID yang sama. dimana value barunya adalah newNotification dan cek return nya
  it('Expect return one notification data with new value', (done) => {
    api.get('/notifications')
    .end((err,res) => {
      if (err) return done(err)
      let resNotification = res.body[res.body.length]

      api.put('/notifications' + resNotification.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newNotification = {
        verb: '345',
        object: 'tidak ada notifikasi',
        userId: 1
      }
      .send(newNotification)
      .end((err, res) => {
        if (err) return done(err)
        let resNotification = res.body
        expect(resNotification.verb).to.be.equal(newNotification.verb)
        expect(resNotification.object).to.be.equal(newNotification.object)
        expect(resNotification.userId).to.be.equal(newNotification.userId)
      })
    })
    done()
  })

  // Delete Data notification yang kita buat sebelumnya.
  it('Expect return count 1 and created notification data is deleted', (done) => {
    api.get('/notifications')
    .end((err, res) => {
      if (err) done(err)
      let resNotification = res.body[res.body.length]

      api.delete('/notifications/' + resNotification.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })

})
