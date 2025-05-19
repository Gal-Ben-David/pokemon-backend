export interface PokeListItem {
    name: string
    url: string
}

type Abilities = {
    ability: { name: string, url: string }
    is_hidden: boolean
    slot: number
}

type Type = {
    type: { name: string, url: string }
    slot: number
}
export interface Pokemon {
    name: string
    abilities: Abilities[]
    types: Type[]
    isFav: boolean
    id: number
}

