import express, { Request, Response } from "express"
import { createServer } from "http"
import cors from "cors"
import { Server, Socket } from "socket.io"

const app = express()
const server = createServer(app)

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5173/tictactoe'],
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`)

})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! How are you?')
})

server.listen(4000, () => {
    console.log('Server is running at http://localhost:4000')
})
