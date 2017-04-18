const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Friend Request endpoint : ', () => {
  let friend_request = {
    profileId: 1,
    friendId: 1,
    status: false
  }

  // Create friend_request
  it('Expect return created data with same value and id', (done) => {
    api.post('/friend_requests')
    .send(friend_request) // .send datanya ada di atas, masing_masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resFriend_Request = res.body

      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resFriend_Request.profileId).to.be.equal(friend_request.profileId)
      expect(resFriend_Request.friendId).to.be.equal(friend_request.friendId)
      expect(resFriend_Request.status).to.be.equal(friend_request.status)
    })
    done()
  })

  // Get friend_request dari endpoint /friend_requests dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new friend_request created before accessing endpoint /friend_requests/:id', (done) => {
    api.get('/friend_requests')
    .end((err, res) => {
      if (err) done(err)
      let resFriend_Request = res.body[res.body.length]

      expect(resFriend_Request.profileId).to.be.equal(friend_request.profileId)
      expect(resFriend_Request.friendId).to.be.equal(friend_request.friendId)
      expect(resFriend_Request.status).to.be.equal(friend_request.status)
    })
    done()
  })

  // Edit friend_request yang tadi dengan ID yang sama. dimana value barunya adalah newFriend_request, dan cek return nya
  it('Expect return one friend_request data with new value', (done) => {
    api.get('/friend_requests')
    .end((err, res) => {
      if (err) done(err)
      let resFriend_request = res.body[res.body.length - 1]

      api.post('/friend_requests/' + resFriend_request.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newFriend_request = {
        profileId: 1,
        friendId: 2,
        status: true
      }
      .send(newFriend_request)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res)
        let resFriend_request = res.body

        expect(resFriend_Request.profileId).to.be.equal(newFriend_request.profileId)
        expect(resFriend_Request.friendId).to.be.equal(newFriend_request.friendId)
        expect(resFriend_Request.status).to.be.equal(newFriend_request.status)
      })
    })
    done()
  })

  // Delete Data friend-request yang kita buat sebelumnya.
  it('Expect return count 1 and created friend-request data is deleted', (done) => {
    api.get('/friend_requests')
    .end((err, res) => {
      if (err) done(err)
      let resFriend_Request = res.body[res.body.length - 1]

      api.delete('/friend_requests/' + resFriend_Request.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })

})
