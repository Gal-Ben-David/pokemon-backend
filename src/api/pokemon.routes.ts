import express from 'express'
import { loadPokemons } from './pokemon.controller.js'

export const pokemonRoutes = express.Router()

pokemonRoutes.get('/', loadPokemons)