const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/favoriteController');


// Route to add a favorite Pokemon
router.post('/favorite', favoriteController.Favorites);
router.delete('/favorite/:id', favoriteController.deleteFavorite);

module.exports = router;