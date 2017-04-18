const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Recomendation endpoint : ', () => {
  // initialize recomendation variable, so we can re use again.
  let recomendation = {
    profileId: 1,
    friendId: 1,
    content: "Jago Matematika"
  }

  //Create recomendation
  it('Expect return created data with same value and id', (done) => {
    api.post('/recomendations')
    .send(recomendation) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resRecomendation = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resRecomendation.profileId).to.be.equal(recomendation.profileId)
      expect(resRecomendation.friendId).to.be.equal(recomendation.friendId)
      expect(resRecomendation.content).to.be.equal(recomendation.content)
    })
    done()
  })

  // Get recomendation dari endpoint /recomendations dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new recomendation created before accessing endpoint /recomendations/:id', (done) => {
    api.get('/recomendations')
    .end((err, res) => {
      if (err) done(err)

      let resRecomendation = res.body[res.body.length]

      expect(resRecomendation.profileId).to.be.equal(recomendation.profileId)
      expect(resRecomendation.friendId).to.be.equal(recomendation.friendId)
      expect(resRecomendation.content).to.be.equal(recomendation.content)
    })
    done()
  })

  // Edit recomendation yang tadi dengan ID yang sama. dimana value barunya adalah newRecomendation, dan cek return nya
  it('Expect return one recomendation data with new value', (done) => {
    api.get('/recomendations')
    .end((err, res) => {
      if (err) done(err)
      let resRecomendation = res.body[res.body.length - 1]

      api.post('/recomendations/' + resRecomendation.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newRecomendation = {
        profileId: 1,
        friendId: 1,
        content: 'Jago FISIKA'
      }
      .send(newRecomendation)
      .end((err, res) => {
        if (err) return done(err)

        let resRecomendation = res.body

        expect(resRecomendation.profileId).to.be.equal(recomendation.profileId)
        expect(resRecomendation.friendId).to.be.equal(recomendation.friendId)
        expect(resRecomendation.content).to.be.equal(recomendation.content)
      })
    })
    done()
  })

  // Delete Data recomendation yang kita buat sebelumnya.
  it('Expect return count 1 and created recomendation data is deleted', (done) => {
    api.get('/recomendations')
    .end((err, res) => {
      if (err) done(err)

      let resRecomendation = res.body[res.body.length - 1]

      api.delete('/recomendations/' + resRecomendation.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })

})
