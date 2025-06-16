const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/searchdata');

// Route to add a favorite search
router.post('/search', favoriteController.searchFavorites);


module.exports = router;