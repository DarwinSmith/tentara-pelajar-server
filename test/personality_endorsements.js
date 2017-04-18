const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Personality Endorsement endpoint : ', () => {
  let personality_endorsement = {
    friendId: 1,
    personalitiesId: 1,
    profileId: 2
  }

  // Create personality_endorsements
  it('Expect return created data with same value and id', (done) => {
    api.post('/personality_endorsements')
    .send(personality_endorsement) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resPersonality_endorsement = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resPersonality_endorsement.friendId).to.be.equal(personality_endorsement.friendId)
      expect(resPersonality_endorsement.personalitiesId).to.be.equal(personality_endorsement.personalitiesId)
    })
    done()
  })

  // Get personality_endorsement dari endpoint /personality_endorsements dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new personality_endorsement created before accessing endpoint /personality_endorsements/:id', (done) => {
    api.get('/personality_endorsements')
    .end((err, res) => {
      if (err) done(err)
      let resPersonality_endorsement = res.body[res.body.length]

      expect(resPersonality_endorsement.friendId).to.be.equal(personality_endorsement.friendId)
      expect(resPersonality_endorsement.personalitiesId).to.be.equal(personality_endorsement.personalitiesId)
    })
    done()
  })

  // Edit personality_endorsement yang tadi dengan ID yang sama. dimana value barunya adalah newPersonality_endorsement, dan cek return nya
  it('Expect return one personality_endorsement data with new value', (done) => {
    api.get('/personality_endorsements')
    .end((err, res) => {
      if (err) done(err)
      let resPersonality_endorsement = res.body[res.body.length - 1]

      api.post('/personality_endorsements/' + resPersonality_endorsement.id)
      .expect('Content-Type', /json/)
      .expect(200)

      let newPersonality_endorsement = {
        friendId: 1,
        personalitiesId: 2,
        profileId: 3
      }
      .send(newPersonality_endorsement)
      .end((err, res) => {
        if (err) return done(err)

        let resPersonality_endorsement = res.body

        expect(resPersonality_endorsement.friendId).to.be.equal(newPersonality_endorsement.friendId)
        expect(resPersonality_endorsement.personalitiesId).to.be.equal(newPersonality_endorsement.personalitiesId)
      })
    })
    done()
  })

  // Delete Data personality_endorsement yang kita buat sebelumnya.
  it('Expect return count 1 and created personality_endorsement data is deleted', (done) => {
    api.get('/personality_endorsements')
    .end((err, res) => {
      if (err) done(err)
      let resPersonality_endorsement = res.body[res.body.length - 1]

      api.delete('/personality_endorsements/' + resPersonality_endorsement.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
