const expect = require('chai').expect
const supertest = require ('supertest')
const api = supertest('http://localhost:3000/api')

describe('Post-reaction endpoint : ', () => {
  let post_reaction = {
    postId: 1,
    reactionId: 1,
    friendId: 1
  }

  // Create post_reaction
  it('Expect return created data with same value and id', (done) => {
    api.post('/post_reactions')
    .send(post_reaction) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resPost_reaction = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resPost_reaction.postId).to.be.equal(post_reaction.postId)
      expect(resPost_reaction.reactionId).to.be.equal(post_reaction.reactionId)
      expect(resPost_reaction.friendId).to.be.equal(post_reaction.friendId)
    })
    done()
  })

  // Get post_reaction dari endpoint /post_reactions dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new post_reaction created before accessing endpoint /profiles/:id', (done) => {
    api.get('/post_reactions')
    .end((err, res) => {
      if (err) done(err)

      let resPost_reaction = res.body[res.body.length]

      expect(resPost_reaction.postId).to.be.equal(post_reaction.postId)
      expect(resPost_reaction.reactionId).to.be.equal(post_reaction.reactionId)
      expect(resPost_reaction.friendId).to.be.equal(post_reaction.friendId)
    })
    done()
  })

  // Edit post_reaction yang tadi dengan ID yang sama. dimana value barunya adalah newPost_reaction, dan cek return nya
  it('Expect return one post_reaction data with new value', (done) => {
    api.get('/post_reactions')
    .end((err, res) => {
      if (err) done(err)
      let resPost_reaction = res.body[res.body.length - 1]

      api.post('/profiles/' + resPost_reaction.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newPost_reaction = {
        postId: 1,
        reactionId: 2,
        friendId: 2
      }
      .send(newPost_reaction)
      .end((err, res) => {
        if (err) return done(err)

        let resPost_reaction = res.body

        expect(resPost_reaction.postId).to.be.equal(post_reaction.postId)
        expect(resPost_reaction.reactionId).to.be.equal(post_reaction.reactionId)
        expect(resPost_reaction.friendId).to.be.equal(post_reaction.friendId)
      })
    })
    done()
  })

  // Delete Data post_reaction yang kita buat sebelumnya.
  it('Expect return count 1 and created post_reaction data is deleted', (done) => {
    api.get('/post_reactions')
    .end((err, res) => {
      if (err) done(err)

      let resPost_reaction = res.body[res.body.length - 1]

      api.delete('/post_reactions/' + resPost_reaction.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
