'use strict'

const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Post endpoint : ', () => {

  // initialize post variable, so we can re use again.
  let post = {
    profileId: 1,
    content: 'No caption needed'
  }

  // Create post
  it('Expect return created data with same value and id', (done) => {
    api.post('/posts')
    .send(post) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resPost = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resPost.profileId).to.be.equal(post.profileId)
      expect(resPost.content).to.be.equal(post.content)
    })
    done()
  })

  // Get post dari endpoint /posts dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new post created before accessing endpoint /posts/:id', (done) => {
    api.get('/posts')
    .end((err, res) => {
      if (err) done(err)
      let resPost = res.body[res.body.length]
      expect(resPost.profileId).to.be.equal(post.profileId)
      expect(resPost.content).to.be.equal(post.content)
    })
    done()
  })

  // Edit post yang tadi dengan ID yang sama. dimana value barunya adalah newPost, dan cek return nya
  it('Expect return one post data with new value', (done) => {
    api.get('/posts')
    .end((err, res) => {
      if (err) done(err)
      let resPost = res.body[res.body.length]

      api.post('/posts/' + resPost.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newPost = {
        content: 'Beautiful Place',
      }
      .send(newPost)
      .end((err, res) => {
        if (err) return done(err)
        let resPost = res.body
        expect(resPost.profileId).to.be.equal(post.profileId)
        expect(resPost.content).to.be.equal(newPost.content)
      })
    })
    done()
  })

  // Delete Data post yang kita buat sebelumnya.
  it('Expect return count 1 and created post data is deleted', (done) => {
    api.get('/posts')
    .end((err, res) => {
      if (err) done(err)
      let resPost = res.body[res.body.length]

      api.delete('/posts/' + resPost.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
