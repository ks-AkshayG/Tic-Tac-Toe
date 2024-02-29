import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleSquareBoard from "./SingleSquareBoard";
import CurrentTurn from "./CurrentTurn";
import Chances from "./Chances";
import Score from "./Score";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useQuery, useQueryClient } from "react-query";
import { Supabase } from "../config/supabase";

import { initialValue, winConditions } from "../constants/ConstantValue";
import { useLocalStorage } from "usehooks-ts";
import { useAtom } from "jotai";
import { isLoginAtom, userDataAtom } from "../constants/JotaiAtoms";
import { GetDataResponceType } from "@/pages/Home";

type GameBoardProps = {
  data: GetDataResponceType;
};

const GameBoard = ({ data }: GameBoardProps) => {
  const { GameID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // console.log(data)

  const [state, setState] = useState(data.state);
  const [turnO, setTurnO] = useState(data.turnO);
  const [winReload, setWinReload] = useState(data.winReload);
  const [winner, setWinner] = useState(data.winner);
  const [countO, setCountO] = useState(data.countO);
  const [countX, setCountX] = useState(data.countX);
  const [countScoreO, setCountScoreO] = useState(data.countScoreO);
  const [countScoreX, setCountScoreX] = useState(data.countScoreX);
  const [countScoreDraw, setCountScoreDraw] = useState(data.countScoreDraw);
  const [drawCountState, setDrawCountState] = useState(data.drawCountState);
  const [currentTurn, setCurrentTurn] = useState(
    data.turnO ? "Current Turn - O" : "Current Turn - X"
  );
  const [winCharacter, setWinCharacter] = useState(data.winCharacter);

  const [character, setCharacter] = useLocalStorage<"O" | "X" | undefined>(
    "charater",
    undefined
  );
  const [userActivity, setUserActivity] = useState(data.user_activity);

  // console.log(userActivity);

  // use to set the character
  const [value, setValue] = useState("");

  const [isLogin] = useAtom(isLoginAtom);
  const [userData] = useAtom(userDataAtom);

  // console.log(userData)

  /**
   * Set the user character
   */
  const handleCharater = () => {
    if (value === "O" || value === "X") {
      setCharacter(value);
    }
  };
  // console.log(character);

  /**
   * Get the user states
   */
  const handleUserScore = async () => {
    const supares = await Supabase.from("tic-tac-toe-users")
      .select()
      .eq("user_email", userData?.user.user_metadata.email)
      .single();

    const data = supares.data;
    // console.log("update", status);

    return data;
  };

  const { refetch: userScoreRefetch } = useQuery(
    "update-data",
    handleUserScore,
    {
      enabled: false,
    }
  );

  /**
   * Update the user states
   */
  useEffect(() => {
    const updateUser = async () => {
      if (userData === undefined) return;

      /**
       * Update the user winner
       */
      if (winner !== "") {
        if (winCharacter === character) {
          const user = await userScoreRefetch();

          const win = user.data.user_win;

          await Supabase.from("tic-tac-toe-users")
            .update({
              user_win: win + 1,
            })
            .eq("user_email", userData.user.user_metadata.email);
        }
      }

      /**
       * Update the user draw
       */
      if (winner !== "" && winner !== "Match Draw") {
        if (winCharacter !== character) {
          const user = await userScoreRefetch();

          const loss = user.data.user_loss;

          await Supabase.from("tic-tac-toe-users")
            .update({
              user_loss: loss + 1,
            })
            .eq("user_email", userData.user.user_metadata.email);
        }
      }

      /**
       * Update the user loss
       */
      if (winner === "Match Draw") {
        const user = await userScoreRefetch();

        if (user.data) {
          const draw = user.data.user_draw;

          await Supabase.from("tic-tac-toe-users")
            .update({
              user_draw: draw + 1,
            })
            .eq("user_email", userData.user.user_metadata.email);
        }
      }
    };
    updateUser();
  }, [winner]);

  /**
   * Update the game states
   */
  const handleUpdateData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .update({
        state,
        turnO,
        winReload,
        winner,
        countO,
        countX,
        countScoreO,
        countScoreX,
        countScoreDraw,
        drawCountState,
        currentTurn,
        winCharacter,
        userActivity
      })
      .eq("id", GameID);

    const status = supares.status;
    // console.log("update", status);

    return status;
  };

  const { refetch: updateRefetch } = useQuery("update-data", handleUpdateData, {
    enabled: false,
    onSettled() {
      queryClient.invalidateQueries("get-score-data");
    },
  });

  /**
   * Funtion for checks the winner
   */
  const handleWinner = async () => {
    if (winReload !== 0) return;

    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i];
      if (state[a] !== "" && state[a] === state[b] && state[a] === state[c]) {
        setWinCharacter(state[a]);
        state[a] === "O"
          ? setCountScoreO((prevCount) => prevCount + 1)
          : setCountScoreX((prevCount) => prevCount + 1);
        setWinner(`Congratulations! ${state[a]} Won`);
        setWinReload(1);
        return true;
      }
    }
    return false;
  };

  /**
   * function for checks the draw
   */
  const handleDraw = async () => {
    if (winReload !== 0) return;

    const isWinner = await handleWinner();

    if (!isWinner) {
      if (drawCountState === 0 && winner === "") {
        setWinner("Match Draw");
        setCountScoreDraw((prevState) => prevState + 1);
        setDrawCountState(10);
        setWinReload(1);
      }
    }
  };

  /**
   * Update the data based on user action
   */
  useEffect(() => {
    const handleRender = async () => {
      await handleDraw();
      await scoreRefetch();
      await updateRefetch();
      await scoreRefetch();
      await updateRefetch();
    };
    handleRender();
  }, [turnO]);

  /**
   * Update the local states based on database updates
   */
  useEffect(() => {
    setState(data.state);
    setTurnO(data.turnO);
    setWinReload(data.winReload);
    setWinner(data.winner);
    setCountO(data.countO);
    setCountX(data.countX);
    setCountScoreO(data.countScoreO);
    setCountScoreX(data.countScoreX);
    setCountScoreDraw(data.countScoreDraw);
    setDrawCountState(data.drawCountState);
    setCurrentTurn(data.currentTurn);
    setWinCharacter(data.winCharacter);
    // setUserActivity(data.user_activity);
  }, [data.turnO, data.state]);

  /**
   * Function for action "O"
   */
  const handleClick = (i: number) => {
    if (
      isLogin === false ||
      state[i] !== "" ||
      winner !== "" ||
      character !== "O" ||
      userData === undefined
    )
      return;

    if (turnO) {
      let newValueArray = [...state];
      newValueArray[i] = "O";
      setState(newValueArray);

      setTurnO(false);

      setCountO((prevState) => prevState - 1);

      setDrawCountState((prevCount) => prevCount - 1);

      if (userActivity === null) {
        setUserActivity([
          {
            user_name: userData.user.user_metadata.full_name,
            user_email: userData.user.user_metadata.email,
            character: "O",
          },
        ]);
      } else {
        setUserActivity((prevActivity) => [
          ...prevActivity,
          {
            user_name: userData.user.user_metadata.full_name,
            user_email: userData.user.user_metadata.email,
            character: "O",
          },
        ]);
      }
    }
  };

  /**
   * Function for action "X"
   */
  const handleDoubleClick = (i: number) => {
    if (
      isLogin === false ||
      state[i] !== "" ||
      winner !== "" ||
      character !== "X" ||
      userData === undefined
    )
      return;

    if (!turnO) {
      let newValueArray = [...state];
      newValueArray[i] = "X";
      setState(newValueArray);

      setTurnO(true);

      setCountX((prevState) => prevState - 1);

      setDrawCountState((prevCount) => prevCount - 1);

      if (userActivity === null) {
        setUserActivity([
          {
            user_name: userData.user.user_metadata.full_name,
            user_email: userData.user.user_metadata.email,
            character: "X",
          },
        ]);
      } else {
        setUserActivity((prevActivity) => [
          ...prevActivity,
          {
            user_name: userData.user.user_metadata.full_name,
            user_email: userData.user.user_metadata.email,
            character: "X",
          },
        ]);
      }
    }
  };

  /**
   * Set the current turn when turnO changes
   */
  useEffect(() => {
    setCurrentTurn(turnO ? "Current Turn - O" : "Current Turn - X");
  }, [turnO]);

  /**
   * Query to reset the data on database
   */
  const handleResetData = async () => {
    if (turnO === true) {
      const supares = await Supabase.from("tic-tac-toe")
        .update({
          state: initialValue,
          turnO: turnO,
          winReload: 0,
          winner: "",
          countO: 5,
          countX: 4,
          countScoreO: countScoreO,
          countScoreX: countScoreX,
          countScoreDraw: countScoreDraw,
          drawCountState: 9,
          currentTurn: currentTurn,
          winCharacter: "",
          userActivity: [],
        })
        .eq("id", GameID);

      return supares;
    } else {
      const supares = await Supabase.from("tic-tac-toe")
        .update({
          state: initialValue,
          turnO: turnO,
          winReload: 0,
          winner: "",
          countO: 4,
          countX: 5,
          countScoreO: countScoreO,
          countScoreX: countScoreX,
          countScoreDraw: countScoreDraw,
          drawCountState: 9,
          currentTurn: currentTurn,
          winCharacter: "",
          userActivity: [],
        })
        .eq("id", GameID);

      return supares;
    }
  };

  const { refetch: ResetRefetch } = useQuery("reset-data", handleResetData, {
    enabled: false,
    onSettled() {
      queryClient.invalidateQueries("get-score-data");
    },
  });

  /**
   * Function for reset the game states locally
   */
  const handleReset = async () => {
    if (isLogin === false) return;

    if (turnO === true) {
      setCountO(5);
      setCountX(4);
    } else {
      setCountO(4);
      setCountX(5);
    }

    setUserActivity([]);
    setWinCharacter("");
    setState(initialValue);
    setWinner("");
    setDrawCountState(9);
    setWinReload(0);
    await ResetRefetch();
  };

  /**
   * Query for delete the game ID permanently
   */
  // const handleDeleteData = async () => {
  //   const supares = await Supabase.from("tic-tac-toe")
  //     .delete()
  //     .eq("id", GameID);

  //   return supares;
  // };

  // const { refetch: DeleteGameRefetch } = useQuery(
  //   "delete-game-data",
  //   handleDeleteData,
  //   {
  //     enabled: false,
  //   }
  // );

  /**
   * Function for handle delete query
   */
  const handleExitGame = async () => {
    // if (isLogin === false) return;

    // await DeleteGameRefetch();
    setCharacter(undefined);
    navigate("/");
  };

  /**
   * Query for get data from database that shows on clients
   */
  const handleGetScoreData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .select()
      .eq("id", GameID)
      .single();

    const data = supares.data as GetDataResponceType;

    return data;
  };

  const {
    data: ScoreData,
    refetch: scoreRefetch,
    // isFetching,
  } = useQuery("get-score-data", handleGetScoreData, {
    keepPreviousData: true,
    refetchInterval: 10000,
    onSettled() {
      queryClient.invalidateQueries("update-data");
    },
  });

  // console.log("fetching score", isFetching);

  /**
   * Function for announce the winner
   */
  const winnerAnnounce = () => {
    return ScoreData?.winner === "" ? ScoreData.currentTurn : ScoreData?.winner;
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      {/* It shows if character is not selected */}
      {!character && isLogin === true && (
        <div>
          <h2 className="my-3 text-[30px]">Enter your character</h2>
          <div className="w-full flex justify-center flex-row">
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="'O' or 'X'"
              className="text-green-600 px-3"
            />
            <Button
              onClick={handleCharater}
              className="border border-black mx-2 px-3 rounded-md"
            >
              Select
            </Button>
          </div>
          {value !== "" && value !== "X" && value !== "O" && (
            <p className="my-2 text-red-600">Enter the correct choice</p>
          )}
        </div>
      )}

      {character && ScoreData && (
        <div>
          {/* Shows GameID */}
          <h2 className="w-full text-start text-[20px] flex items-center">
            GameID:
            <span className=" text-green-700 text-[30px] ml-1">{GameID}</span>
          </h2>

          {/* Score section */}
          <div className=" w-full flex flex-row justify-around">
            <Score character="O" score={ScoreData.countScoreO} />
            <Score character="Draw" score={ScoreData.countScoreDraw} />
            <Score character="X" score={ScoreData.countScoreX} />
          </div>

          {/* Game section */}
          <div className="w-[80vw] flex flex-row justify-evenly items-center">
            {/* Right chances section */}
            <div>
              <Chances character="O" chances={ScoreData.countO} />
            </div>

            <div className="flex flex-col">
              {/* Shows the current turn */}
              <div className="text-center text-[40px] mb-5">
                <CurrentTurn turn={winnerAnnounce()} />
              </div>

              {/* Shows the user character */}
              <p className="w-full text-start text-[20px] flex items-center">
                You are playing as
                <span className=" text-red-700 text-[30px] ml-1">
                  {character}
                </span>
              </p>

              {/* Center game section */}
              <div className="flex justify-center items-center flex-row text-[100px]">
                <SingleSquareBoard
                  value={ScoreData.state[0]}
                  onClick={() => handleClick(0)}
                  onDoubleClick={() => handleDoubleClick(0)}
                />
                <SingleSquareBoard
                  value={ScoreData.state[1]}
                  onClick={() => handleClick(1)}
                  onDoubleClick={() => handleDoubleClick(1)}
                />
                <SingleSquareBoard
                  value={ScoreData.state[2]}
                  onClick={() => handleClick(2)}
                  onDoubleClick={() => handleDoubleClick(2)}
                />
              </div>
              <div className="flex justify-center items-center flex-row text-[100px]">
                <SingleSquareBoard
                  value={ScoreData.state[3]}
                  onClick={() => handleClick(3)}
                  onDoubleClick={() => handleDoubleClick(3)}
                />
                <SingleSquareBoard
                  value={ScoreData.state[4]}
                  onClick={() => handleClick(4)}
                  onDoubleClick={() => handleDoubleClick(4)}
                />
                <SingleSquareBoard
                  value={ScoreData.state[5]}
                  onClick={() => handleClick(5)}
                  onDoubleClick={() => handleDoubleClick(5)}
                />
              </div>
              <div className="flex justify-center items-center flex-row text-[100px]">
                <SingleSquareBoard
                  value={ScoreData.state[6]}
                  onClick={() => handleClick(6)}
                  onDoubleClick={() => handleDoubleClick(6)}
                />
                <SingleSquareBoard
                  value={ScoreData.state[7]}
                  onClick={() => handleClick(7)}
                  onDoubleClick={() => handleDoubleClick(7)}
                />
                <SingleSquareBoard
                  value={ScoreData.state[8]}
                  onClick={() => handleClick(8)}
                  onDoubleClick={() => handleDoubleClick(8)}
                />
              </div>

              <div className="flex justify-evenly">
                {/* New game button, Visible when user won/loss/draw */}
                {winner !== "" && (
                  <Button
                    className="text-[26px] mt-[30px]"
                    onClick={handleReset}
                  >
                    New
                  </Button>
                )}

                {/* Game exit button */}
                <Button
                  className="text-[26px] mt-[30px]"
                  onClick={handleExitGame}
                >
                  Exit
                </Button>
              </div>
            </div>

            {/* Left chances section */}
            <div>
              <Chances character="X" chances={ScoreData.countX} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
