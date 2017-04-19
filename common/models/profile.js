'use strict';

module.exports = function(Profile) {
  var app = require('../../server/server');

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
  }

 Profile.remoteMethod('getFriendSuggestions', {
   accepts: {arg: 'id', type: 'number', required: true},
   http: {path: '/:id/friend_suggestions', verb: 'get'},
   returns: {arg: 'friend_suggestions', type: 'Array'},
 })

 Profile.getFriendSuggestions= (id, cb) => {
   Profile.findById(id)
     .then(profile => {
       profile.friends({
        fields: {
          id: true
        }
       })
         .then(friends => {
            let friendListIds = friends 
            Profile.find({
              where: {
               id: {nin: [id, ...friendListIds]}
              }
            })
            .then(suggestions => {
              cb(null, suggestions)
            })
            .catch(err => console.error(err.message))
         })
         .catch(err => console.error(err.message))

     })
     .catch(err => console.error(err.message))
 }

 Profile.remoteMethod('getProfileContacts', {
   accepts: {arg: 'id', type: 'number', required: true},
   http: {path: '/:id/contacts', verb: 'get'},
   returns: {arg: 'contacts', type: 'Array'},
 })

 Profile.getProfileContacts = (id, cb) => {
   Profile.findById(id)
     .then(profile => {
       profile.friends({})
         .then(friends => {
           cb(null, friends)
         })
         .catch(err => console.error(err.message))

     })
     .catch(err => console.error(err.message))
 }
}
