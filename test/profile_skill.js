const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('Profile Skill endpoint : ', () => {
  // initialize profile-skill variable, so we can re use again.
  let profile_skill = {
    profileId: 1,
    skillId: 2
  }

  // Create profile-skill
  it('Expect return created data with same value and id', (done) => {
    api.post('/profile_skills')
    .send(profile_skill) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resProfile_skill = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resProfile_skill.profileId).to.be.equal(profile_skill.profileId)
      expect(resProfile_skill.skillId).to.be.equal(profile_skill.skillId)
    })
    done()
  })

  // Get profile_skill dari endpoint /profiles dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new profile_skill created before accessing endpoint /profiles_skills/:id', (done) => {
    api.get('/profile_skills')
    .end((err, res) => {
      if (err) done(err)
      let resProfile_skill = res.body[res.body.length]
      expect(resProfile_skill.profileId).to.be.equal(profile_skill.profileId)
      expect(resProfile_skill.skillId).to.be.equal(profile_skill.skillId)
    })
    done()
  })

  // Edit profile_skill yang tadi dengan ID yang sama. dimana value barunya adalah newProfile_skill, dan cek return nya
  it('Expect return one profile data with new value', (done) => {
    api.get('/profile_skills')
    .end((err, res) => {
      if (err) done(err)
      let resProfile_skill = res.body[res.body.length - 1]

      api.post('/profile_skills/' + resProfile_skill.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newProfile_skill = {
        profileId: 2,
        skillId: 1
      }
      .send(newProfile_skill)
      .end((err, res) => {
        if (err) return done(err)
        console.log(res)
        let resProfile_skill = res.body
        expect(resProfile_skill.profileId).to.be.equal(newProfile_skill.profileId)
        expect(resProfile_skill.skillId).to.be.equal(newProfile_skill.skillId)
      })
    })
    done()
  })

  // Delete Data profile_skill yang kita buat sebelumnya.
  it('Expect return count 1 and created profile data is deleted', (done) => {
    api.get('/profile_skills')
    .end((err, res) => {
      if (err) done(err)
      let resProfile_skill = res.body[res.body.length - 1]

      api.delete('/profile_skills/' + resProfile_skill.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })
})
