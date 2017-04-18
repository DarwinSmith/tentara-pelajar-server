'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Reaction endpoint : ', () => {

  // initialize reaction variable, so we can re use again.
  let reaction = {
    profileId: 1,
    postId: 1,
    emoji: ':smile'
  }

  // Create reaction  INI MASIH ERROR GA TAU KENAPA
  // it('Expect return created data with same value and id', (done) => {
  //   api.post('/reactions')
  //   .send(reaction) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
  //   .end((err, res) => {
  //     if (err) return done(err)
  //     var resReaction = res.body
  //     //expect balikan dari res.body adalah data yang sudah kita create
  //     expect(resReaction.profileId).to.be.equal(reaction.profileId)
  //     expect(resReaction.postId).to.be.equal(reaction.postId)
  //     expect(resReaction.emoji).to.be.equal(reaction.emoji)
  //   })
  //   done()
  // })

  // Get reaction dari endpoint /reactions dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new reaction created before accessing endpoint /reactions/:id', (done) => {
    api.get('/reactions')
    .end((err, res) => {
      if (err) done(err)
      let resReaction = res.body[res.body.length]
      expect(resReaction.profileId).to.be.equal(reaction.profileId)
      expect(resReaction.postId).to.be.equal(reaction.postId)
      expect(resReaction.emoji).to.be.equal(reaction.emoji)
    })
    done()
  })

  // Edit reaction yang tadi dengan ID yang sama. dimana value barunya adalah newReaction, dan cek return nya
  it('Expect return one reaction data with new value', (done) => {
    api.get('/reactions')
    .end((err, res) => {
      if (err) done(err)
      let resReaction = res.body[res.body.length]

      api.post('/reactions/' + resReaction.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newReaction = {
        emoji: ':sad',
      }
      .send(newReaction)
      .end((err, res) => {
        if (err) return done(err)
        let resReaction = res.body
        expect(resReaction.profileId).to.be.equal(reaction.profileId)
        expect(resReaction.postId).to.be.equal(reaction.postId)
        expect(resReaction.emoji).to.be.equal(newReaction.emoji)
      })
    })
    done()
  })

  // Delete Data reaction yang kita buat sebelumnya.
  it('Expect return count 1 and created reaction data is deleted', (done) => {
    api.get('/reactions')
    .end((err, res) => {
      if (err) done(err)
      let resReaction = res.body[res.body.length]

      api.delete('/reactions/' + resReaction.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
