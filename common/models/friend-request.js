'use strict';
const app = require('../../server/server')

module.exports = function (Friendrequest) {
  Friendrequest.afterRemote('create', (ctx, FR, next) => {
    let Profile = app.models.profile
    let Notification = app.models.notification

    Profile.findById(FR.profileId)
      .then(profile => {
        Notification.create({
          verb: `${profile.fullname} has sent friend request`,
          object: 'Friend Request',
          userId: FR.profileId,
          profileId: FR.friendId,
          friendRequestPayload: FR.id
        })
        next()
      })
  })
  Friendrequest.beforeRemote('**', (ctx, nuusedvar, next) => {
    let FR = ctx.args.data
    if (ctx.method.name === 'replaceById' || ctx.method.name === 'updateAttributes') {
      let Profile = app.models.profile
      let Notification = app.models.notification
      let Friend = app.models.friend

      Profile.findById(FR.friendId)
        .then(friend => {
          Notification.create({
            verb: `${friend.fullname} has accepted your friend request`,
            object: 'Friend Approval',
            userId: FR.friendId,
            profileId: FR.profileId,
          })
          .then(notif => { })
          .catch(err => console.error(err.message))
        })

      Friend.create({
        profileId: FR.profileId,
        friendId: FR.friendId
      })
      Friend.create({
        profileId: FR.friendId,
        friendId: FR.profileId
      })
      next()
    } else {
      next()
    }
  })
}

