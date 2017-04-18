const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Skill Endorsement endpoint : ', () => {
  // initialize skill_endorsement variable, so we can re use again.
  let skill_endorsement = {
    friendId: 1,
    skillId: 2
  }

  // Create skill_endorsement
  it('Expect return created data with same value and id', (done) => {
    api.post('/skill_endorsements')
    .send(skill_endorsement) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resSkill_endorsement = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resSkill_endorsement.friendId).to.be.equal(skill_endorsement.friendId)
      expect(resSkill_endorsement.skillId).to.be.equal(skill_endorsement.skillId)
    })
    done()
  })

  // Get skill_endorsement dari endpoint /skill_endorsements dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new profile created before accessing endpoint /skill_endorsements/:id', (done) => {
    api.get('/skill_endorsements')
    .end((err, res) => {
      if (err) done(err)
      let resSkill_endorsement = res.body[res.body.length]
      expect(resSkill_endorsement.friendId).to.be.equal(skill_endorsement.friendId)
      expect(resSkill_endorsement.skillId).to.be.equal(skill_endorsement.skillId)
    })
    done()
  })

  // Edit skill_endorsement yang tadi dengan ID yang sama. dimana value barunya adalah newSkill_endorsement, dan cek return nya
  it('Expect return one skill_endorsement data with new value', (done) => {
    api.get('/skill_endorsements')
    .end((err, res) => {
      if (err) done(err)
      let resSkill_endorsement = res.body[res.body.length - 1]

      api.post('/skill_endorsements/' + resSkill_endorsement.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newSkill_endorsement = {
        friendId: 2,
        skillId: 2
      }
      .send(newSkill_endorsement)
      .end((err, res) => {
        if (err) return done(err)

        let resSkill_endorsement = res.body
        expect(resSkill_endorsement.friendId).to.be.equal(newSkill_endorsement.friendId)
        expect(resSkill_endorsement.skillId).to.be.equal(newSkill_endorsement.skillId)
      })
    })
    done()
  })

  // Delete Data skill_endorsement yang kita buat sebelumnya.
  it('Expect return count 1 and created skill_endorsement data is deleted', (done) => {
    api.get('/skill_endorsements')
    .end((err, res) => {
      if (err) done(err)
      let resSkill_endorsement = res.body[res.body.length - 1]

      api.delete('/skill_endorsements/' + resSkill_endorsement.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
