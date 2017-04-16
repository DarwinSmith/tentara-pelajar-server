'use strict';
const app = '../../server/server'

module.exports = function(Reaction) {
  Reaction.afterRemote('create', (ctx, reaction, next) => {
    let Post = app.models.post
    let Notification = app.models.notification
    Post.findById(reaction.postId, (err, post) => {
      if (reaction.profileId === post.profileId) {
        next()
      }
      else {
        if (err) console.log(err)
        Notification.create({
          verb: `User profile ${reaction.profileId} is give reaction on your post`,
          object: 'Post Reaction',
          userId: post.profileId
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
