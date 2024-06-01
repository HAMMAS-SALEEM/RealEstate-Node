import mongoose from "mongoose";
import user from "./user.model.js"
import estate from './estate.model.js'

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = user;
db.estate = estate;

export default db;