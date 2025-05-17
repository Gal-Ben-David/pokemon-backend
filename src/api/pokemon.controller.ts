import { pokemonService } from "./pokemon.service.js";
import { Request, Response } from 'express'

export const loadPokemons = async (req: Request, res: Response) => {
    try {
        const pokemons = await pokemonService.query()
        res.send(pokemons)
    } catch (err) {
        res.status(400).send('Cannot get pokemons')
    }
}
