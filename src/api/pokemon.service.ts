import fs from 'fs/promises'
import path from 'path'
import { PokeListItem } from '../interfaces.js'
import type { Pokemon } from '../interfaces.js'

const filePath = path.resolve('data', 'pokemon.json')

const writeToFile = async (path: string, content: Pokemon[]) => {
    try {
        await fs.writeFile(path, JSON.stringify(content, null, 2))
    } catch (err) {
        console.error(`Failed to add content to ${path}:`, err)
        throw err
    }
}

const loadFromFile = async (filePath: string) => {
    try {
        const content = await fs.readFile(filePath, 'utf-8')
        const res = JSON.parse(content)
        return res
    } catch (err) {
        console.error(`Failed to load ${filePath}:`, err)
        throw err
    }
}

const query = async (isFavPoke: boolean) => {
    try {
        let parsed: Pokemon[] = await loadFromFile(filePath)

        if (!parsed || !parsed.length) {
            console.log('File is empty, fetching full Pokémon data...')

            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
            const data = await res.json()

            const fullData = await Promise.all(
                data.results.map(async (poke: PokeListItem) => {
                    const res = await fetch(poke.url)
                    const pokeDetails = await res.json()

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
            await writeToFile(filePath, fullData)
            return fullData
        }

        return isFavPoke ? parsed.filter(poke => poke.isFav) : parsed

    } catch (err) {
        console.error('Failed to fetch Pokémon:', err)
        throw err
    }
}

const add = async (pokemonId: number) => {

    const pokemons = await loadFromFile(filePath)
    let newFavPok = {}

    const updatedPokemonList = pokemons.map((poke: Pokemon) => {
        if (poke.id === pokemonId) {
            newFavPok = { ...poke, isFav: true }
            return newFavPok
        } else return poke
    })

    await writeToFile(filePath, updatedPokemonList)

    return newFavPok
}

const remove = async (pokemonId: string) => {
    const pokemons = await loadFromFile(filePath)

    const updatedPokemonList = pokemons.map((poke: Pokemon) =>
        poke.id === +pokemonId ? { ...poke, isFav: false } : poke)

    await writeToFile(filePath, updatedPokemonList)

    return 1
}

export const pokemonService = {
    query,
    add,
    remove,
}