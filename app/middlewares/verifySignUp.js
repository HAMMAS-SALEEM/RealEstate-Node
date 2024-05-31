import db from '../models/index.js'

const User = db.user

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.user.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (user) {
      res.status(400).send({ message: 'Username is already in use' })
      return
    }

    User.findOne({
      email: req.user.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (user) {
        res.status(400).send({ message: 'Email is already in use' })
        return
      }
      next()
    })
  })
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail
}

export default verifySignUp;
