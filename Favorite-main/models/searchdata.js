const  mongoose = require('mongoose');

const Schema = mongoose.Schema;
const searchFavoriteSchema = new Schema({
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

const SearchFavorite = mongoose.model('SearchFavorite', searchFavoriteSchema);
module.exports = SearchFavorite;