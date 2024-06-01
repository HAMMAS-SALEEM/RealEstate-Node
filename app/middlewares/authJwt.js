import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token,
    config.secret,
    (error, decoded) => {
        if (error) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    }
  )
}

const authJwt = {
  verifyToken,
}

export default authJwt;