import express, { Request, Response } from "express"
import { createServer } from "http"
import cors from "cors"
import { Server, Socket } from "socket.io"

type DataType = {
    state: string[]
    turnO: boolean
    winReload: number
    winner: string
    countO: string[]
    countX: string[]
    countScoreO: number
    countScoreX: number
    countScoreDraw: number
    drawCountState: number
    currentTurn: string
}

type ResetDataType = {
    state: string[],
    winner: string,
    countO: string[],
    countX: string[],
    drawCountState: number,
    winReload: number
}

type callback = (value: any) => any

const app = express()
const server = createServer(app)

app.use(cors())

const roomArray: string[] = []

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5173/tictactoe'],
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (roomData: string, callback: callback) => {
        let count = roomArray.filter(room => room === roomData).length;

        if (count < 2) {
            roomArray.push(roomData);
            socket.join(roomData);

        } 
        callback(count);
    })

    // socket.on("send_test", (message, room) => {
    //     io.to(room).emit('receive_test', message)
    // })

    socket.on("send_data", (data: DataType, room: string) => {
        // socket.broadcast.emit("received_state", data)
        // console.log(room)
        io.to(room).emit("received_data", data)
    })

    socket.on("send_reset_data", (resetData: ResetDataType, room: string) => {
        // console.log(room)
        io.to(room).emit("received_reset_data", resetData)
    })

    socket.on("disconnect_room", (roomData: string, callback: callback) => {
        
        const index = roomArray.indexOf(roomData)
        roomArray.splice(index, 1)
        
        callback(true)
        socket.disconnect()
    })

})

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! How are you?')
})

server.listen(4000, () => {
    console.log('Server is running at http://localhost:4000')
})
