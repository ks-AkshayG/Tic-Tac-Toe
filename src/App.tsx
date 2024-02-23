import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameBoard from "./component/GameBoard";
import {  io } from "socket.io-client";
import { atom, useAtom } from "jotai";

export const roomIDAtom = atom("");
export const countAtom = atom(0);
export const idAtom = atom("O");

const App = () => {
  const socket = io("http://localhost:4000");

  return (
    <>
      <div className="w-[100vw] h-[100vh] text-center bg-gray-300 flex flex-col justify-center">
        <div className=" w-full ">
          <BrowserRouter>
            <Routes>
              {socket && <Route path="/" element={<Home socket={socket} />} />}
              {socket && (
                <Route
                  path="/tictactoe"
                  element={<GameBoard socket={socket} />}
                />
              )}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default App;
