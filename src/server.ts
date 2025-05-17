import http from 'http'
import cors from 'cors'
import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'
import dotenv from 'dotenv'

import { pokemonRoutes } from './api/pokemon.routes.js'


const favoritesFilePath = path.resolve('data', 'favorites.json')
const app = express()
const server = http.createServer(app)
app.use(express.json())

dotenv.config({
    path: '.env', //give .env file location
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('dist')))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:5173',
            'http://localhost:5173',
            'http://127.0.0.1:5174',
            'http://localhost:5174',
            'http://127.0.0.1:3030',
            'http://localhost:3030',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use('/api/pokemon', pokemonRoutes)

const PORT = process.env.PORT || 3030
server.listen(PORT, () =>
    console.log(`Server listening on port http://127.0.0.1:${PORT}/`)
)