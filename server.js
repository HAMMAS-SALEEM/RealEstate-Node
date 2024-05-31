import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen('3001', () => {
  console.log('Server is running on port 3001');
})

app.get('/message', (req, res) => {
  res.json({ message: "Server is running on port"})
})