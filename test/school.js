const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000/api')

describe('School endpoint : ', () => {
  let school = {
    name: 'SMA 8',
    address: 'Jakarta',
    description: 'SMA 8 Jakarta',
    grade: 'Sekolah Menengah Atas'
  }

  // Create school
  it('Expect return created data with same value and id', (done) => {
    api.post('/schools')
    .send(school) // .send datanya ada di atas, masing-masing key adalah nama form valuenya itu isinya
    .end((err, res) => {
      if (err) return done(err)
      var resSchool = res.body
      //expect balikan dari res.body adalah data yang sudah kita create
      expect(resSchool.name).to.be.equal(school.name)
      expect(resSchool.address).to.be.equal(school.address)
      expect(resSchool.description).to.be.equal(school.description)
      expect(resSchool.grade).to.be.equal(school.grade)
    })
    done()
  })

  // Get school dari endpoint /schools dan cek data terakhir (data terakhir adalah data yang kita buat sebelumnya) dan cek hasilnya
  it('Expect return one new school created before accessing endpoint /schools/:id', (done) => {
    api.get('/schools')
    .end((err, res) => {
      if (err) done(err)
      let resSchool = res.body[res.body.length]
      expect(resSchool.name).to.be.equal(school.name)
      expect(resSchool.address).to.be.equal(school.address)
      expect(resSchool.description).to.be.equal(school.descdescription)
      expect(resSchool.grade).to.be.equal(school.grade)
    })
    done()
  })

  // Edit school yang tadi dengan ID yang sama. dimana value barunya adalah newSchool, dan cek return nya
  it('Expect return one school data with new value', (done) => {
    api.get('/schools')
    .end((err, res) => {
      if (err) done(err)
      let resSchool = res.body[res.body.length - 1]

      api.post('/schools/' + resSchool.id)
      .expect('Content-Type', /json/)
      .expect(200)
      let newSchool = {
        name: 'SMA 8',
        address: 'Jakarta Selatan',
        description: 'SMA 8 Jakarta menuju masa depan gemilang',
        grade: 'Sekolah Menengah Atas'
      }
      .send(newSchool)
      .end((err, res) => {
        if (err) return done(err)
        let resSchool = res.body
        expect(resSchool.name).to.be.equal(school.name)
        expect(resSchool.address).to.be.equal(school.address)
        expect(resSchool.description).to.be.equal(school.descdescription)
        expect(resSchool.grade).to.be.equal(school.grade)
      })
    })
    done()
  })

  // Delete Data school yang kita buat sebelumnya.
  it('Expect return count 1 and created school data is deleted', (done) => {
    api.get('/schools')
    .end((err, res) => {
      if (err) done(err)
      let resSchool = res.body[res.body.length - 1]

      api.delete('/schools/' + resSchool.id)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.count).to.be.equal(1)
      })
    })
    done()
  })


})
