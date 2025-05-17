import express from 'express'
import { loadPokemons, addPokemonToFavList } from './pokemon.controller.js'

export const pokemonRoutes = express.Router()

pokemonRoutes.get('/', loadPokemons)
pokemonRoutes.post('/', addPokemonToFavList)