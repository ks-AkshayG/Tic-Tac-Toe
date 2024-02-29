import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Supabase } from "../config/supabase";
import { useAtom } from "jotai";
import { isLoginAtom, userDataAtom } from "../constants/JotaiAtoms";
import { initialValue } from "../constants/ConstantValue";

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
  winCharacter: string;
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
      <button
        className="border border-black py-1 px-3 rounded-xl text-[30px] hover:text-green-600 hover:border-green-600"
        onClick={handleNewGame}
      >
        New Game
      </button>

      {/* Goto existing game button */}
      <button
        className="border border-black py-1 px-3 rounded-xl text-[30px] hover:text-green-600 hover:border-green-600 ml-2"
        onClick={handleExistingGame}
      >
        Existing Game
      </button>

      <p className="w-full text-[24px] mt-10 text-teal-500">Top5 Playes</p>
      <div className="w-full flex justify-center mt-3">
        {/* Table of user states */}
        <table className="w-[70vw] border border-black">
          {/* Table header */}
          <thead className="border border-black">
            <tr className="border border-black">
              <td className="border border-black">Username</td>
              <td className="border border-black">Win</td>
              <td className="border border-black">Loss</td>
              <td className="border border-black">Draw</td>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {userMatches?.map((user) => (
              <tr key={user.id}>
                <td className="border border-black text-start px-2">
                  {user.user_name}
                </td>
                <td className="border border-black">{user.user_win}</td>
                <td className="border border-black">{user.user_loss}</td>
                <td className="border border-black">{user.user_draw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
