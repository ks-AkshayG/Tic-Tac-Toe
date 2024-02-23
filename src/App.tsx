import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import GameBoard from "./component/GameBoard"
import { io } from "socket.io-client"

const App = () => {

  const socket = io("http://localhost:4000")

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 flex flex-col'>
        <div className=" container w-full text-center my-[20px]">

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home socket={socket} />} />
                <Route path="/tictactoe" element={<GameBoard socket={socket} />} />
              </Routes>
            </BrowserRouter>

        </div>
      </div>
    </>
  )
}

export default App
