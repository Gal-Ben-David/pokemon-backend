import http from 'http'
import cors from 'cors'
import express from 'express'
import path from 'path'


const app = express()
const server = http.createServer(app)

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

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
})

const PORT = process.env.PORT || 3030
server.listen(PORT, () =>
    console.log(`Server listening on port http://127.0.0.1:${PORT}/`)
)