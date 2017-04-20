'use strict';
const app = require('../../server/server')

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
        let Profile = app.models.profile
        Profile.findById(reaction.profileId)
          .then(profile => {
            Notification.create({
              verb: `${profile.fullname} is give reaction on your post`,
              object: 'Post Reaction',
              userId: reaction.profileId,
              profileId: post.profileId
            }, (err, res) => {
              if (err) console.log(err)
              else {
                next()
              }
            })
          })
      }
    })
  })
}
