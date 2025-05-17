import { utilService } from "../services/util.service.js";

const query = async () => {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await res.json()
        return data.results
    } catch (err) {
        console.error('Failed to fetch Pokémon:', err)
        throw err
    }
}

export const pokemonService = {
    query,
}