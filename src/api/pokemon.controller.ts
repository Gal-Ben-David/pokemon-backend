import { pokemonService } from "./pokemon.service.js";
import { Request, Response } from 'express'

export const loadPokemons = async (req: Request, res: Response) => {
    try {
        const pokemons = await pokemonService.query()
        res.send(pokemons)
    } catch (err) {
        res.status(400).send('Cannot load pokemons')
    }
}

export const loadFavList = async (req: Request, res: Response) => {
    try {
        const favList = await pokemonService.loadFavList()
        res.send(favList)
    } catch (err) {
        res.status(400).send('Cannot load fav list')
    }
}

export const addPokemonToFavList = async (req: Request, res: Response) => {
    try {
        const { pokemonId } = req.body
        const addedPoke = await pokemonService.add(pokemonId)
        res.send(addedPoke)
    } catch (err) {
        res.status(400).send('Cannot add pokemon to Fav list')
    }
}

export const removePokemonFromFavList = async (req: Request, res: Response) => {
    try {
        const pokemonId = req.params.id
        const removedPoke = await pokemonService.remove(pokemonId)
        res.send(removedPoke)
    } catch (err) {
        res.status(400).send('Cannot remove pokemon from Fav list')
    }
}


