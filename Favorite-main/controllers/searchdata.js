const searchFavoriteSchema = require('../models/searchdata');
const axios = require('axios');
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';


exports.searchFavorites = async (req, res) => {
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
        
        const searchFavorite = await searchFavoriteSchema.create({
            name: pokemon.name,
            url: pokemon.url
        });
        
        return res.status(201).json(searchFavorite);
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.searchPokemonExternal = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name query parameter is required' });
        }
        const response = await axios.get(baseUrl);
        if (response.status !== 200) {
            return res.status(response.status).json({ message: 'Error fetching Pokemon data' });
        }
        const pokemonList = response.data.results;
        const pokemon = pokemonList.find(p => p.name === name);
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        return res.status(200).json(pokemon);
    } catch (error) {
        console.error('Error searching Pokemon in external API:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
