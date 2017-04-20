const es = require('event-stream')
module.exports = (app) => {
  app.middleware('routes:before', function (req, res, next) {
    if (req.path.indexOf('change-stream') !== -1) {
      res.setTimeout(24 * 3600 * 1000)
      res.set('X-Accel-Buffering', 'no')
    }
    return next()
  })

  const Notification = app.models.Notification
  Notification.createChangeStream((err, changes) => {
    if (err) console.log(err)
    changes.pipe(es.stringify()).pipe(process.stdout)
  })

  const Post = app.models.post
  Post.createChangeStream((err, changes) => {
    if (err) console.error(err)
    changes.pipe(es.stringify()).pipe(process.stdout)
  })

}

// const es = require('event-stream')
//
// module.exports = (app) => {
//   const Notification = app.models.Notification
//   Notification.remoteMethod('streamNotification', {
//     http: {path: '/stream/:id', verg: 'get'},
//     accepts:
//     [
//       {arg: 'id', type: 'number', required: true},
//       {arg: 'res', type: 'object', 'http': {source: 'res'}}
//     ]
//   })
//   Notification.streamNotification = (id, res) => {
//     Notification.createChangeStream({'where': {'profileId': id}}, (err, changes) => {
//       if (err) console.log(err)
//       changes.pipe(es.stringify()).pipe(process.stdout)
//     })
//   }
// }
