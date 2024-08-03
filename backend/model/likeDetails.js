const mongoose = require('mongoose');

const likeDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  eventName: { type: String, required: true }
 });

const LikeDetails = mongoose.model('LikeDetails', likeDetailsSchema);

module.exports = LikeDetails