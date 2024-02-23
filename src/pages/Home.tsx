import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { Socket } from "socket.io-client";

// ---------------------------------------------------------------

type HomeProps = {
  socket: Socket
}

export const roomIDAtom = atom('')
export const countAtom = atom(0)
export const idAtom = atom("O")

const Home = ({ socket }: HomeProps) => {
  const [count, setCount] = useAtom(countAtom);
  const [room, setRoom] = useAtom(roomIDAtom);
  const [playerType, setPlayerType] = useAtom(idAtom);

  const navigate = useNavigate();

  const handleRoomConnection = () => {
    if (room !== "") {
      socket.emit("join_room", room, (response: number) => {
        response < 2 ? navigate(`/tictactoe`) : setCount(response)
        response === 0 ? setPlayerType("O") : setPlayerType("X")
      });
    }
  }

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
          onClick={handleRoomConnection}
        >
          New Game
        </button>
      </div>
      {
        count > 1 && <p>Room is full</p>
      }
    </div>
  );
};

export default Home;
