import mongoose from 'mongoose'

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true,
  })
)

export default User
