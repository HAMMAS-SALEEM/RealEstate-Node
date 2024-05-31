import db from '../models/index.js'

const User = db.user

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).then((user) => {
    if (user) {
      res.status(400).send({ message: 'Username is already in use' })
      return
    }

    User.findOne({
      email: req.body.email
    }).then((user) => {
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
