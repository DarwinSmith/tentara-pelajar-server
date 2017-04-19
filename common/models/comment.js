'use strict';
const app = require('../../server/server')

module.exports = function (Comment) {
  // Send notification to post.profileId, if someone comment on that profile
  Comment.afterRemote('create', (ctx, comment, next) => {
    let Post = app.models.post
    let Notification = app.models.notification
    Post.findById(comment.postId, (err, post) => {
      if (comment.profileId === post.profileId) {
        next()
      }
      else {
        if (err) console.log(err)
        Notification.create({
          verb: `User profile ${comment.profileId} is comment on your post`,
          object: 'Post Comment',
          userId: comment.profileId,
          profileId: post.profileId
        }, (err, res) => {
          if (err) console.log(err)
          else {
            next()
          }
        })
      }
    })
  })
}
