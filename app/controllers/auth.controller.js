import config from '../config/auth.config.js'
import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const User = db.user

export const signup = (req, res) => {
  User.findOne({
    username: req.user.username,
    email: req.body.email,
    password: bcrypt.hash(req.body.password, 8)
  }).exec(err => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    res.status(200).send({ message: 'User Successfully Created!' })
  })
}

export const signin = (req, res) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!user) {
      res.status(404).send({ message: 'User Not Found' })
      return
    }
    let passwordIsValid = bcrypt.hash(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' })
    }
    const token = jwt.sign(
        {id: user.id},
        config.secret,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400
        }
    )
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    })
  })
};

const authController = {
    signup,
    signin,
}

export default authController;
