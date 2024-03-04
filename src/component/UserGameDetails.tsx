import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Supabase } from "@/config/supabase";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/component/ui/table";
import SingleSquareBoard from "./SingleSquareBoard";

type UserSingleRecordType = {
  id: number;
  created_at: string;
  user_name: string;
  user_email: string;
  game_state: Array<string>;
  game_id: number;
  user_states: Array<string>;
  character: string;
  winner: string;
  win_character: string;
};

type GameStatesType = {
  user_name: string;
  user_email: string;
  character: string;
  index: number;
};

// Give readable code to the index
const index = ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C"];

const UserGameDetails = () => {
  const { id } = useParams();

  /**
   * Query for getting perticular game data
   */
  const handleSingleMatchRecord = async () => {
    const supares = await Supabase.from("tic-tac-toe-games")
      .select()
      .eq("id", id)
      .single();

    return supares.data as UserSingleRecordType;
  };

  const { data } = useQuery(
    "get-single-match-record",
    handleSingleMatchRecord
    // {
    //   enabled: false,
    // }
  );

  console.log(data);

  /**
   * Function to identify the winner name
   */
  const winner = () => {
    if (data === undefined) return;
    if (data.winner === "Match Draw") return "Match Draw";
    if (data.character === data.win_character) return data.user_name;

    const userState0: GameStatesType = JSON.parse(data.user_states[0]);
    const userState1: GameStatesType = JSON.parse(data.user_states[1]);

    return data.user_email === userState0.user_email
      ? userState1.user_name
      : userState0.user_name;
  };

  /**
   * Function to identify the opponent name
   */
  const opponentName = () => {
    if (data === undefined) return;
    const userState0: GameStatesType = JSON.parse(data.user_states[0]);
    const userState1: GameStatesType = JSON.parse(data.user_states[1]);

    return data.user_email === userState0.user_email
      ? userState1.user_name
      : userState0.user_name;
  };

  return (
    <div>
      {/* Upper section/ name of the players */}
      <div className="flex flex-row justify-around my-[40px]">
        <div className="flex flex-row">
          <p className=" text-[30px]">You:</p>
          <span className="underline text-[30px] text-blue-600">
            {data?.user_name}
          </span>
        </div>
        <div className="flex flex-row">
          <p className=" text-[30px]">Opponent:</p>
          <span className="underline text-[30px] text-blue-600">
            {opponentName()}
          </span>
        </div>
      </div>

      {/* Middle section */}
      <div className="flex flex-row justify-around items-center my-[70px]">
        {/* Table of user action */}
        <div>
          <Table className="w-[30vw] border border-black">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Username</TableHead>
                <TableHead className="text-center">Position</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.user_states.map((state) => {
                const gameState: GameStatesType = JSON.parse(state);

                return (
                  <TableRow key={gameState.index}>
                    <TableCell className="text-left">
                      {gameState.user_name}
                    </TableCell>
                    <TableCell>{index[gameState.index]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* GameBoard of user match */}
        {data && (
          <div>
            <div className="flex justify-center items-center flex-row text-[100px]">
              <SingleSquareBoard value={data.game_state[0]} />
              <SingleSquareBoard value={data.game_state[1]} />
              <SingleSquareBoard value={data.game_state[2]} />
            </div>
            <div className="flex justify-center items-center flex-row text-[100px]">
              <SingleSquareBoard value={data.game_state[3]} />
              <SingleSquareBoard value={data.game_state[4]} />
              <SingleSquareBoard value={data.game_state[5]} />
            </div>
            <div className="flex justify-center items-center flex-row text-[100px]">
              <SingleSquareBoard value={data.game_state[6]} />
              <SingleSquareBoard value={data.game_state[7]} />
              <SingleSquareBoard value={data.game_state[8]} />
            </div>
          </div>
        )}
      </div>

      {/* Lower section/ Winner name */}
      <div className=" text-[30px]">
        Winner: <span className=" text-violet-700 underline">{winner()}</span>
      </div>
    </div>
  );
};

export default UserGameDetails;
