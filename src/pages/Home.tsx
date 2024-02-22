import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// ---------------------------------------------------------------

const Home = () => {
  
  const socket = io("http://localhost:4000")

  const navigate = useNavigate()

  const handleGetData = async () => {
    // console.log("created");
    // console.log(data.data)
    navigate(`/tictactoe`)
  };

  return (
    <div>
      <h1 className="w-full text-[70px] text-lime-600">Tic - Tac - Toe</h1>
        <button
          className="border border-black py-1 px-3 rounded-xl text-[30px] hover:text-green-600 hover:border-green-600"
          onClick={handleGetData}
        >
          New Game
        </button>
    </div>
  );
};

export default Home;
