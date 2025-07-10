import express from 'express'
import { loadPokemons, addPokemonToFavList, removePokemonFromFavList } from './pokemon.controller.js'

export const pokemonRoutes = express.Router()

pokemonRoutes.get('/', loadPokemons)
pokemonRoutes.post('/', addPokemonToFavList)
pokemonRoutes.delete('/:id', removePokemonFromFavList)