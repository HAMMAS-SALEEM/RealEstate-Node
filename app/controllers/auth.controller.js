import config from '../config/auth.config.js'
import db from '../models/index.js'
import bcrypt from 'bcrypt'
import tokenGenerator from '../utils/tokenGenerator.js'

const User = db.user

export const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  user
    .save()
    .then(user => {
      const token = tokenGenerator(user._id, config.secret);
      const data = {
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      }
      res.status(200).send({ message: 'User Successfully Created!', user: data })
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

export const signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        res.status(404).send({ message: 'Invalid Email' })
        return
      }
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid Password!' })
      }
      const token = tokenGenerator(user.id, config.secret)
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      })
    })
    .catch(error => {
      res.status(500).send({ message: error.message })
    })
}

const authController = {
  signup,
  signin
}

export default authController
