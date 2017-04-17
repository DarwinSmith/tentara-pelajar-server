module.exports = app => {
  const Profile = app.models.profile
  const Friend = app.models.friend

  Profile.nestRemoting('friends')
  Profile.nestRemoting('posts')
  Friend.nestRemoting('friend')
}
