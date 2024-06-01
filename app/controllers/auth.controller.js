import config from '../config/auth.config.js'
import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const User = db.user

export const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  user
    .save()
    .then(() => {
      res.status(200).send({ message: 'User Successfully Created!' })
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

export const signin = (req, res) => {
  User.findOne({
      email: req.body.email
  }).then((user) => {
    if (!user) {
      res.status(404).send({ message: 'User Not Found' })
      return
    }
    let passwordIsValid = bcrypt.hash(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' })
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400
    })
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    })
  }).catch((error) => {
    res.status(500).send({ message: error.message })
  })
}

const authController = {
  signup,
  signin
}

export default authController;
