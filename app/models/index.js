import mongoose from "mongoose";
import user from "./user.model.js"

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = user;

export default db;