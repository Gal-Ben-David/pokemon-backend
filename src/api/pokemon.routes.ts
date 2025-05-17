import express from 'express'
import { getPokemons } from './pokemon.controller.js'

export const pokemonRoutes = express.Router()

pokemonRoutes.get('/', getPokemons)