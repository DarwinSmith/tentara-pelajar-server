'use strict';
const app = require('../../server/server')

module.exports = function (Friendrequest) {
  Friendrequest.afterRemote('create', (ctx, FR, next) => {
    let Notification = app.models.notification
    Notification.create({
      verb: `User ${FR.profileId} has send friend request`,
      object: 'Friend Request',
      userId: FR.friendId
    })
    next()
  })
  Friendrequest.beforeRemote('**', (ctx, nuusedvar, next) => {
    let FR = ctx.args.data
    if (ctx.method.name === 'replaceById') {
      let Notification = app.models.notification
      let Friend = app.models.friend
      Notification.create({
        verb: `User ${FR.friendId} has accepted your friend request`,
        object: 'Friend Approval',
        userId: FR.profileId,
        profileId: FR.friendId
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

