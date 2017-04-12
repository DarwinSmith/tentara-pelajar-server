'use strict';

module.exports = function(Profile) {
  Profile.remoteMethod('getProfilesFromId', {
    accepts: {arg: 'id', type: 'number', required: true},
    http: {path: '/:id/skills', verb: 'get'},
    returns: {arg: 'skills', type: 'Object'}
  })

  Profile.getProfilesFromId = function (id, cb) {
    Profile.findAll({where:{id:id}}, function (err, skill) {
      cb(null, coffee)
    })
  }
};
