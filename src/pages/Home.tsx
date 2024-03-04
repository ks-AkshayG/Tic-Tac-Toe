import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Supabase } from "../config/supabase";
import { useAtom } from "jotai";
import { isLoginAtom, userDataAtom } from "../constants/JotaiAtoms";
import { initialValue } from "../constants/ConstantValue";
import { Button } from "@/component/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table"

export type GetDataResponceType = {
  id: number;
  created_at: string;
  state: string[];
  turnO: boolean;
  winReload: number;
  winner: string;
  countO: number;
  countX: number;
  countScoreO: number;
  countScoreX: number;
  countScoreDraw: number;
  drawCountState: number;
  currentTurn: string;
  winCharacter: string;
  userActivity: {
    user_name: string
    user_email: string
    character: string
    index: number
  }[]
};

export type GetUserResponceType = {
  id: number;
  created_at: string;
  user_name: string;
  user_email: string;
  user_win: number;
  user_loss: number;
  user_draw: number;
}[];

const Home = () => {
  const [userData] = useAtom(userDataAtom);
  const [isLogin] = useAtom(isLoginAtom);

  const navigate = useNavigate();

  /**
   * Create new game body
   */
  const handleCreateData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .insert({
        state: initialValue,
        turnO: true,
        winReload: 0,
        winner: "",
        countO: 5,
        countX: 4,
        countScoreO: 0,
        countScoreX: 0,
        countScoreDraw: 0,
        drawCountState: 9,
        currentTurn: "Current Turn - O",
        winCharacter: "",
        useActivity: []
      })
      .select()
      .single();

    const data = supares.data as GetDataResponceType;
    return data;
  };

  const { refetch: dataRefetch } = useQuery(
    "create-game-data",
    handleCreateData,
    {
      enabled: false,
    }
  );

  /**
   * Create new user
   */
  const handleCreateUser = async () => {
    if (userData === undefined) return alert("You have not loggedin");

    // console.log(userData.user.user_metadata);

    const supares = await Supabase.from("tic-tac-toe-users")
      .insert({
        user_name: userData.user.user_metadata.full_name,
        user_email: userData.user.user_metadata.email,
        user_win: 0,
        user_loss: 0,
        user_draw: 0,
      })
      .select()
      .single();

    return supares;
  };

  const { refetch: userRefetch } = useQuery("create-user", handleCreateUser, {
    enabled: false,
  });

  /**
   * Check the existing user in user table
   */
  const handleCheckUser = async () => {
    if (userData === undefined) return alert("You have not loggedin");

    // console.log(userData.user.user_metadata);

    const supares = await Supabase.from("tic-tac-toe-users")
      .select()
      .eq("user_email", userData.user.user_metadata.email)
      .single();

    return supares.status;
  };

  const { refetch: checkUserRefetch } = useQuery(
    "check-user",
    handleCheckUser,
    {
      enabled: false,
    }
  );

  /**
   * New game body creator function
   */
  const handleNewGame = async () => {
    if (isLogin === false) return alert("You are not logged in");

    const user = await checkUserRefetch();
    // console.log(user.data);

    if (user.data !== 200) {
      const user = await userRefetch();
      // console.log(user.data);

      if (user.data?.error !== null) return;

      const data = await dataRefetch();
      // console.log("created");
      // console.log(data.data)
      navigate(`/tictactoe/${data.data?.id}`);

      return;
    }

    const data = await dataRefetch();
    // console.log("created");
    // console.log(data.data)
    navigate(`/tictactoe/${data.data?.id}`);
  };

  /**
   * Function for Redirect to existing game
   */
  const handleExistingGame = async () => {
    if (isLogin === false) return alert("You are not logged in");

    const user = await checkUserRefetch();
    // console.log(user.data);

    if (user.data !== 200) {
      const user = await userRefetch();
      // console.log(user.data);

      if (user.data?.error !== null) return;

      // setUserEmail(user.data.data.user_email);

      const GameID = prompt("Enter the GameID");

      if (GameID) {
        navigate(`/tictactoe/${GameID}`);
      }

      return;
    }

    const GameID = prompt("Enter the GameID");

    if (GameID) {
      navigate(`/tictactoe/${GameID}`);
    }
  };

  /**
   * Query for get the user states
   */
  const handleUserMatches = async () => {
    const supares = await Supabase.from("tic-tac-toe-users")
      .select()
      .order("user_win", { ascending: false })
      .order("user_draw", { ascending: false })
      .order("user_loss", { ascending: true })
      .range(0, 4);

    const data = supares.data as GetUserResponceType;

    return data;
  };

  const { data: userMatches } = useQuery(
    "user-match-score",
    handleUserMatches,
    {
      enabled: true,
    }
  );

  return (
    <div>
      <h1 className="w-full text-[70px] text-lime-600">Tic - Tac - Toe</h1>

      {/* Create new game button */}
      <Button
        className="text-[27px]"
        onClick={handleNewGame}
      >
        New Game
      </Button>

      {/* Goto existing game button */}
      <Button
        className="text-[27px] mx-2"
        onClick={handleExistingGame}
      >
        Existing Game
      </Button>

      <div className="w-full flex justify-center mt-[100px]">
        <Table className="w-[70vw] border border-black">
          <TableCaption className=" text-[30px]">Top 5 Players</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Username</TableHead>
              <TableHead className="text-center">Win</TableHead>
              <TableHead className="text-center">Loss</TableHead>
              <TableHead className="text-center">Draw</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              userMatches?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-left">{user.user_name}</TableCell>
                  <TableCell>{user.user_win}</TableCell>
                  <TableCell>{user.user_loss}</TableCell>
                  <TableCell>{user.user_draw}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
