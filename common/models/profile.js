'use strict'

module.exports = function (Profile) {
  var app = require('../../server/server')
  
  // Profile.afterRemote('create', (ctx, user, next) => {
  //   let Media = app.models.media
  //   Media.create({
  //     postId: 1,
  //     directory: user.fullname
  //   }, (err, res) => {
  //   })
  //   next()
  // })

  Profile.remoteMethod('addSkillToProfile', {
    accepts: [
      {arg: 'id', type: 'number', required: true},
      {arg: 'skillId', type: 'number', required: true}
    ],
    http: {path: '/:id/skills/:skillId', verb: 'post'},
    returns: {arg: 'skills', type: 'Object'}
  })
  Profile.addSkillToProfile = (id, skillId, cb) => {
    Profile.findById(id, (err, profile) => {
      app.models.skill.findById(skillId, (err, skill) => {
        profile.skills.add(skill, (err, profileNew) => {
          cb(null, profileNew)
        })
      })
    })
  }
  //
  // Profile.getProfilesFromId = function (id, cb) {
  //   Profile.findOne({where: {id: id}}, function (err, profile) {
  //     Profile.app.models.Skill.find({}, (err, skills) => {
  //       cb(null, skills)
  //     })
  //     // profile.skills({}, function (err, skills) {
  //     //   cb(null, skills)
  //     // })
  //   })
  // }
}
