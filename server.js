import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';

export const MONGO_URI = `mongodb+srv://hammassaleem376:6oBlxFzkPWArOBFU@cluster0.615ixwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

app.listen('3001', () => {
  console.log('Server is running on port 3001');
})

authRoutes(app);
userRoutes(app);

app.get('/message', (req, res) => {
  res.json({ message: "Server is running on port"})
})

