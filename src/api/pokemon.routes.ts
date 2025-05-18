import express from 'express'
import { loadPokemons, addPokemonToFavList, removePokemonFromFavList, loadFavList } from './pokemon.controller.js'

export const pokemonRoutes = express.Router()

pokemonRoutes.get('/', loadPokemons)
pokemonRoutes.get('/favList', loadFavList)
pokemonRoutes.post('/', addPokemonToFavList)
pokemonRoutes.delete('/:id', removePokemonFromFavList)