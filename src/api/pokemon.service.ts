import fs from 'fs/promises'
import path from 'path'
import { PokeListItem } from '../interfaces.js'

const filePath = path.resolve('data', 'pokemon.json')

const query = async () => {
    try {
        const content = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(content)

        if (!parsed || !parsed.length) {
            console.log('File is empty, fetching full Pokémon data...')

            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
            const data = await res.json()

            const fullData = await Promise.all(
                data.results.map(async (poke: PokeListItem) => {
                    const res = await fetch(poke.url)
                    const pokeDetails = await res.json()

                    // const speciesRes = await fetch(pokeDetails.species.url)
                    // const speciesData = await speciesRes.json()

                    const pokeToSave = {
                        id: pokeDetails.id,
                        name: pokeDetails.name,
                        abilities: pokeDetails.abilities,
                        types: pokeDetails.types,
                        isFav: false,
                    }

                    return pokeToSave
                })
            )
            console.log('Writing to file...')
            await fs.writeFile(filePath, JSON.stringify(fullData, null, 2))
            return fullData
        }

        return parsed

    } catch (err) {
        console.error('Failed to fetch Pokémon:', err)
        throw err
    }
}

export const pokemonService = {
    query,
}