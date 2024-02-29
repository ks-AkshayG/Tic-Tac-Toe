import { Supabase } from "../config/supabase";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import GameBoard from "../component/GameBoard";
import { GetDataResponceType } from "./Home";

const Game = () => {
  const { GameID } = useParams();

  /**
   * Get game data every 5 sec
   */
  const handleGetData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .select()
      .eq("id", GameID)
      .single();

    const data = supares.data as GetDataResponceType;
    // console.log('supabase data', data)

    return data;
  };

  const { data } = useQuery("get-all-data", handleGetData, {
    keepPreviousData: true,
    refetchInterval: 5000,
  });

  // console.log("query data", data)

  return <div>{data && <GameBoard data={data} />}</div>;
};

export default Game;
