'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Comment endpoint : ', () => {

  // initialize comment variable, so we can re use again.
  let comment = {
    profileId: 1,
    postId: 1,
    content: 'good posting anyway'
  }

  // Create comment
  it('Expect return created data with same value and id', (done) => {
    api.post('/comments')
    .send(comment) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resComment = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resComment.profileId).to.be.equal(comment.profileId)
      expect(resComment.postId).to.be.equal(comment.postId)
      expect(resComment.content).to.be.equal(comment.content)
    })
    done()
  })

  // Get comment dari endpoint /comments dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new comment created before accessing endpoint /comments/:id', (done) => {
    api.get('/comments')
    .end((err, res) => {
      if (err) done(err)
      let resComment = res.body[res.body.length]
      expect(resComment.profileId).to.be.equal(comment.profileId)
      expect(resComment.postId).to.be.equal(comment.postId)
      expect(resComment.content).to.be.equal(comment.content)
    })
    done()
  })

  // Edit comment yang tadi dengan ID yang sama. dimana value barunya adalah newComment, dan cek return nya
  it('Expect return one comment data with new value', (done) => {
    api.get('/comments')
    .end((err, res) => {
      if (err) done(err)
      let resComment = res.body[res.body.length]

      api.post('/comments/' + resComment.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newComment = {
        content: 'Sorry just kidding',
      }
      .send(newComment)
      .end((err, res) => {
        if (err) return done(err)
        let resComment = res.body
        expect(resComment.profileId).to.be.equal(comment.profileId)
        expect(resComment.postId).to.be.equal(comment.postId)
        expect(resComment.content).to.be.equal(newComment.content)
      })
    })
    done()
  })

  // Delete Data comment yang kita buat sebelumnya.
  it('Expect return count 1 and created comment data is deleted', (done) => {
    api.get('/comments')
    .end((err, res) => {
      if (err) done(err)
      let resComment = res.body[res.body.length]

      api.delete('/comments/' + resComment.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
