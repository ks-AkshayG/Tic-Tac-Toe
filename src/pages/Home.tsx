import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { atom, useAtom } from "jotai";

// ---------------------------------------------------------------

export const roomID = atom('')

const Home = () => {
  const [room, setRoom] = useAtom(roomID);
  // const [data, setData] = useState('');

  const socket = io("http://localhost:4000");

  const navigate = useNavigate();

  const handleGetData = async () => {
    if (room !== "") {
      socket.emit("join_room", room);
      navigate(`/tictactoe`);
    }
    // console.log("created");
    // console.log(data.data)
  };

  // const handleTest = () => {
  //   socket.emit("send_test", 'Test Message', room)
  // }

  // useEffect(() => {
  //   socket.on("receive_test", (message: string) => {
  //     setData(message)
  //   })
  // },[socket])

  return (
    <div>
      <h1 className="w-full text-[70px] text-lime-600">Tic - Tac - Toe</h1>
      <div className="flex flex-row justify-center">
        <input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          className="mr-3 border border-black rounded-lg text-[25px] px-2"
        />
        <button
          className="border border-black py-1 px-3 rounded-xl text-[30px] hover:text-green-600 hover:border-green-600"
          onClick={handleGetData}
        >
          New Game
        </button>
      </div>
      {/* <button onClick={handleTest}>test</button>
      {
        data
      } */}
    </div>
  );
};

export default Home;
