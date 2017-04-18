'use strict';

module.exports = function(Profile) {
  var app = require('../../server/server');

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
      {arg: 'skillId', type: 'number', required: true},
    ],
    http: {path: '/:id/skills/:skillId', verb: 'post'},
    returns: {arg: 'skills', type: 'Object'},
  });

  Profile.addSkillToProfile = function(id, skillId, cb) {
    Profile.findById(id, function(err, profile) {
      app.models.skill.findById(skillId, function(err, skill) {
        profile.skills.add(skill, function(err, profileNew) {
          cb(null, profileNew);
        });
      });
    })
  };

  Profile.remoteMethod('searchFriendQuery', {
    accepts: {arg: 'name', type: 'string', required: true},
    http: {path: '/search-friend/:name', verb: 'get'},
    returns: {arg: 'friendSearch', type: 'Array'}
  })

  Profile.searchFriendQuery = (name, cb) => {
    Profile.find({
      where: {
        fullname: {
          regexp: `/${name}/i`
        }
      }, limit: 5
    })
    .then(profiles => {
      console.log(profiles);
      cb(null, profiles)
    })
    .catch(err => {
      cb(err, null)
    })
  }

  Profile.remoteMethod('getTimelines', {
    accepts: {arg: 'id', type: 'number', required: true},
    http: {path: '/:id/timelines', verb: 'get'},
    returns: {arg: 'timelines', type: 'Array'},
  });

  Profile.getTimelines = function(id, cb) {
    Profile.findById(id)
      .then(profile => {

        profile.friends({
          fields: {
            id: true
          }
        })
          .then(friends => {

            friends.push(profile)
            let friendsIds = friends.map(friend => friend.id)
            app.models.post.find({
              where: {
                profileId: {inq: friendsIds}
              },
              order: 'updatedAt DESC',
              include: 'profile'
            })
              .then(posts => {
                cb(null, posts)
              })
              .catch(err => console.error(err))

          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  };


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
};
