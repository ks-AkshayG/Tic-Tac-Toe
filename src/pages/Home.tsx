import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Supabase } from "../config/supabase";
import { initialO, initialValue, initialX } from "../constants/ConstantValue";

export type GetDataResponceType = {
  id: number;
  created_at: string;
  state: string[];
  turnO: boolean;
  winReload: number;
  winner: string;
  countO: string[];
  countX: string[];
  countScoreO: number;
  countScoreX: number;
  countScoreDraw: number;
  drawCountState: number;
  currentTurn: string;
};

const Home = () => {

  const navigate = useNavigate()

  const handleCreateData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .insert({
        state: initialValue,
        turnO: true,
        winReload: 0,
        winner: "",
        countO: initialO,
        countX: initialX,
        countScoreO: 0,
        countScoreX: 0,
        countScoreDraw: 0,
        drawCountState: 9,
        currentTurn: "Current Turn - O",
      })
      .select()
      .single()

    const data = supares.data as GetDataResponceType;
    return data;
  };

  const { refetch } = useQuery("create-game-data", handleCreateData, {
    enabled: false,
  });

  const handleGetData = async () => {
    const data = await refetch()
    // console.log("created");
    // console.log(data.data)
    navigate(`/tictactoe/${data.data?.id}`)
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
