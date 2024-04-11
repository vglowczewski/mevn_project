// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: String
});

module.exports = mongoose.model('User', userSchema);
