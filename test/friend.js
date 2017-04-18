const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Friend endpoint : ', () => {
  let friend = {
    profileId: 1,
    friendId: 1
  }

  // Create friend
  it('Expect return created data with same value and id', (done) => {
    api.post('/friends')
    .send(friend) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resFriend = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resFriend.profileId).to.be.equal(friend.profileId)
      expect(resFriend.friendId).to.be.equal(friend.friendId)
    })
    done()
  })

  // Get friend dari endpoint /friends dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new friend created before accessing endpoint /friends/:id', (done) => {
    api.get('/friends')
    .end((err, res) => {
      if (err) done(err)
      let resFriend = res.body[res.body.length]
      expect(resFriend.profileId).to.be.equal(friend.profileId)
      expect(resFriend.friendId).to.be.equal(friend.friendId)
    })
    done()
  })

  // Edit friend yang tadi dengan ID yang sama. dimana value barunya adalah newFriebd, dan cek return nya
  it('Expect return one profile data with new value', (done) => {
    api.get('/friends')
    .end((err, res) => {
      if (err) done(err)
      let resFriend = res.body[res.body.length - 1]

      api.post('/friends/' + resFriend.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newProfile = {
        profileId: 1,
        friendId: 2
      }
      .send(newFriend)
      .end((err, res) => {
        if (err) return done(err)

        let resFriend = res.body
        expect(resFriend.profileId).to.be.equal(friend.profileId)
        expect(resFriend.friendId).to.be.equal(friend.friendId)
      })
    })
    done()
  })

  // Delete Data friend yang kita buat sebelumnya.
  it('Expect return count 1 and created friend data is deleted', (done) => {
    api.get('/friends')
    .end((err, res) => {
      if (err) done(err)
      let resFriend = res.body[res.body.length - 1]

      api.delete('/profiles/' + resFriend.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
