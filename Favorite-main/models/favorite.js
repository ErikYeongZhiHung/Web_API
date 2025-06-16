const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favoriteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;