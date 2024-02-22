import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import GameBoard from "./component/GameBoard"
import { useState } from "react"

const App = () => {

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 flex flex-col'>
        <div className=" container w-full text-center my-[20px]">

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tictactoe" element={<GameBoard />} />
              </Routes>
            </BrowserRouter>

        </div>
      </div>
    </>
  )
}

export default App
