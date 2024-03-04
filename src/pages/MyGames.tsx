import { useMemo, useState } from "react";
import { Supabase } from "@/config/supabase";
import { userDataAtom } from "@/constants/JotaiAtoms";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/component/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/component/ui/table";

type UserRecordsType = {
  id: number;
  created_at: string;
  user_name: string;
  user_email: string;
  game_state: Array<string>;
  game_id: number;
  user_states: string;
  character: string;
  winner: string;
  win_character: string;
}[];

const MyGames = () => {
  const [userData] = useAtom(userDataAtom);
  const [filter, setFilter] = useState<"all" | "win" | "Loss" | "Draw">("all");

  const navigate = useNavigate();

  /**
   * Function to handle the navigation to the perticular game detail
   */
  const handleExplore = (id: number) => {
    navigate(`${id}`);
  };

  /**
   * Function to set the filter type
   */
  const handleFilterClick = (filterType: "all" | "win" | "Loss" | "Draw") => {
    setFilter(filterType);
  };

  /**
   * Function for refilter all data
   */
  const handleFilterAllData = () => {
    if (data === undefined) return;

    // console.log(data)
    return data;
  };

  /**
   * Function for filter win data
   */
  const handleFilterWinData = () => {
    if (data === undefined) return;

    const winner = data.filter((user) => {
      return user.character === user.win_character;
    });

    console.log(winner);

    return winner;
  };

  /**
   * Function for filter to Draw data
   */
  const handleFilterDrawData = () => {
    if (data === undefined) return;

    const Draw = data.filter((user) => {
      return user.winner === "Match Draw";
    });
    console.log(Draw);

    return Draw;
  };

  /**
   * Function for filter loss data
   */
  const handleFilterLossData = () => {
    if (data === undefined) return;

    const Loss = data.filter((user) => {
      return (
        user.winner !== "Match Draw" && user.character !== user.win_character
      );
    });

    console.log(Loss);

    return Loss;
  };

  /**
   * Query for get user's all matches
   */
  const handleUserRecords = async () => {
    if (userData === undefined) return;

    const supares = await Supabase.from("tic-tac-toe-games")
      .select()
      .eq("user_email", userData.user.user_metadata.email);

    // console.log('supares', supares);

    return supares.data as UserRecordsType;
  };

  const { data } = useQuery("get-game-records", handleUserRecords, {});

  // console.log('Data', data)

  /**
   * Function for handle the type of filter
   */
  const filteredData = useMemo(() => {
    if (!data) return [];

    switch (filter) {
      case "win":
        return handleFilterWinData();

      case "Draw":
        return handleFilterDrawData();

      case "Loss":
        return handleFilterLossData();

      case "all":
        return handleFilterAllData();
    }
  }, [data, filter]);

  return (
    <div className="w-full flex justify-center items-center flex-col mt-3">
      {/* Types of filter */}
      <div className="w-[70vw] flex flex-row items-center my-5">
        <div className="text-[30px]">Filters:</div>
        <div className="mx-4">
          <Button onClick={() => handleFilterClick("all")}>All</Button>
        </div>
        <div className="mx-4">
          <Button onClick={() => handleFilterClick("win")}>Win</Button>
        </div>
        <div className="mx-4">
          <Button onClick={() => handleFilterClick("Draw")}>Draw</Button>
        </div>
        <div className="mx-4">
          <Button onClick={() => handleFilterClick("Loss")}>Loss</Button>
        </div>
      </div>

      {/* Table of user's match contents */}
      <Table className="w-[70vw] border border-black">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">You</TableHead>
            <TableHead className="text-center">Opponent</TableHead>
            <TableHead className="text-center">Winner</TableHead>
            <TableHead className="text-center">Draw</TableHead>
            <TableHead className="text-center">Detils</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData?.map((user) => {
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

                <TableCell>
                  <Button
                    onClick={() => handleExplore(user.id)}
                    variant={"ghost"}
                  >
                    Explore
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyGames;
