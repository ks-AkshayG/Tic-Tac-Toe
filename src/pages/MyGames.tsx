import { Supabase } from "@/config/supabase";
import { userDataAtom } from "@/constants/JotaiAtoms";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/component/ui/table";

type userRecordsType = {
  id: number;
  created_at: string;
  user_name: string;
  user_email: string;
  game_state: Array<string>;
  game_id: number;
  // user_states: {
  //   user_name: string;
  //   user_email: string;
  //   character: string;
  //   index: number;
  // }[];
  user_states: string;
  character: string;
  winner: string;
  win_character: string;
}[];

const MyGames = () => {
  const [userData] = useAtom(userDataAtom);

  const navigate = useNavigate()

  const handleExplore = (id: number) => {
    navigate(`${id}`)
  }

  const handleUserRecords = async () => {
    if (userData === undefined) return;

    const supares = await Supabase.from("tic-tac-toe-games")
      .select()
      .eq("user_email", userData.user.user_metadata.email);

    // console.log('supares', supares);

    return supares.data as userRecordsType;
  };

  const { data } = useQuery("get-game-records", handleUserRecords, {});

  // console.log('Data', data)
  console.log(data);

  return (
    <div className="w-full flex justify-center mt-3">
      <Table className="w-[70vw] border border-black">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Username</TableHead>
            <TableHead className="text-center">Opponent</TableHead>
            <TableHead className="text-center">Winner</TableHead>
            <TableHead className="text-center">Draw</TableHead>
            <TableHead className="text-center">Detils</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((user) => {
            // const userState = JSON.parse(user.user_states)

            return (
              <TableRow key={user.id}>
                <TableCell>{user.user_name}</TableCell>

                {user.user_name ===
                JSON.parse(user.user_states[0]).user_name ? (
                  <TableCell>
                    {JSON.parse(user.user_states[1]).user_name}
                  </TableCell>
                ) : (
                  <TableCell>
                    {JSON.parse(user.user_states[0]).user_name}
                  </TableCell>
                )}

                {user.character === user.win_character ? (
                  <TableCell>{user.user_name}</TableCell>
                ) : (
                  <>
                    {user.winner === "Match Draw" ? (
                      <TableCell>-</TableCell>
                    ) : (
                      <>
                        {user.user_name ===
                        JSON.parse(user.user_states[0]).user_name ? (
                          <TableCell>
                            {JSON.parse(user.user_states[1]).user_name}
                          </TableCell>
                        ) : (
                          <TableCell>
                            {JSON.parse(user.user_states[0]).user_name}
                          </TableCell>
                        )}
                      </>
                    )}
                  </>
                )}

                {user.winner === "Match Draw" ? (
                  <TableCell>Match Draw</TableCell>
                ) : (
                  <TableCell>-</TableCell>
                )}

                <TableCell><button onClick={() => handleExplore(user.id)} className=" border border-zinc-400 py-1 px-3 rounded-sm">Explore</button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyGames;
