import jwt from 'jsonwebtoken'

export default (id, secret) => {
  const token = jwt.sign({ id }, secret, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true,
    expiresIn: 86400
  })
  return token
}
