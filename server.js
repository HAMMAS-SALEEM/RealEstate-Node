import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './app/routes/auth.routes.js'
import userRoutes from './app/routes/user.routes.js'
import estateRoutes from './app/routes/estate.routes.js'

export const MONGO_URI = `mongodb+srv://hammassaleem376:6oBlxFzkPWArOBFU@cluster0.615ixwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express()

app.use(cors())
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connect to MongoDB.')
  })
  .catch(err => {
    console.error('Connection error', err)
    process.exit()
  })

app.listen('3001', () => {
  console.log('Server is running on port 3001')
})

authRoutes(app)
userRoutes(app)
estateRoutes(app)
