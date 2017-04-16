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

  Friendrequest.afterRemote('update', (ctr, FR, next) => {
    if (FR.status === true) {
      let Notification = app.models.notification
      let Friend = app.models.friend
      Notification.create({
        verb: `User ${FR.friendId} has accepted your friend request`,
        object: 'Friend Approval',
        userId: FR.profileId
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
