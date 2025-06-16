const favorite = require('../models/favorite');
const axios = require('axios');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

exports.Favorites = async (req, res) => {
    try {
        const { name } = req.body;
        const response = await axios.get(baseUrl);
        if (response.status !== 200) {
            return res.status(response.status).json({ message: 'Error fetching Pokemon data' });
        }

        const pokemonList = response.data.results;
        const pokemon = pokemonList.find(p => p.name === name);
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        const favoritePokemon = await favorite.create({
            name: pokemon.name,
            url: pokemon.url
        });
        return res.status(201).json(favoritePokemon);
    }
    catch (error) {
        console.error('Error fetching Pokemon:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFavorite = await favorite.findByIdAndDelete(id);
        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        return res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        console.error('Error deleting favorite:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}