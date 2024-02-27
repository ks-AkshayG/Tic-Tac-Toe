import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleSquareBoard from "./SingleSquareBoard";
import CurrentTurn from "./CurrentTurn";
import Chances from "./Chances";
import Score from "./Score";
import MenuButton from "./MenuButton";
import MenuIcon from "../assets/bx-menu.svg";

import { useQuery, useQueryClient } from "react-query";
import { Supabase } from "../config/supabase";

import {
  initialValue,
  initialO,
  initialX,
  winConditions,
} from "../constants/ConstantValue";
import { GetSingleUserData } from "../pages/Game";
import { useLocalStorage } from "usehooks-ts";
import { useAtom } from "jotai";
import { isLoginAtom } from "../constants/JotaiAtoms";

type GameBoardProps = {
  data: GetSingleUserData;
};

const GameBoard = ({ data }: GameBoardProps) => {
  const { GameID } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // console.log(data)

  const [state, setState] = useState(data.state);
  const [menu, setMenu] = useState(false);
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
  const [character, setCharacter] = useLocalStorage<"O" | "X" | undefined>("charater", undefined); //
  const [value, setValue] = useState("");

  const [isLogin] = useAtom(isLoginAtom)
  // const [userData] = useAtom(userDataAtom)

  // console.log(userData)

  const handleCharater = () => {

    if (value === "O" || value === "X") {
      setCharacter(value);
    }
  };
  // console.log(character);

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
      })
      .eq("id", GameID);

    const status = supares.status;
    console.log("update", status);

    return status;
  };

  const { refetch: updateRefetch } = useQuery("update-data", handleUpdateData, {
    enabled: false,
    onSettled() {
      queryClient.invalidateQueries("get-score-data");
    },
  });

  const handleWinner = async () => {
    if (winReload !== 0) return;

    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i];
      if (state[a] !== "" && state[a] === state[b] && state[a] === state[c]) {
        setWinner(`Congratulations! ${state[a]} Won`);
        state[a] === "O"
          ? setCountScoreO((prevCount) => prevCount + 1)
          : setCountScoreX((prevCount) => prevCount + 1);
        setWinReload(1);
        return true;
      }
    }
    return false;
  };

  let handleDraw = async () => {
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
  }, [data.turnO]);

  const handleClick = (i: number) => {
    if (isLogin === false || state[i] !== "" || winner !== "" || character !== "O") return;
    
    if (turnO) {
      let newValueArray = [...state];
      newValueArray[i] = "O";
      setState(newValueArray);

      setTurnO(false);

      let newCountO = [...countO];
      newCountO.pop();
      setCountO(newCountO);

      setDrawCountState((prevCount) => prevCount - 1);
    }
  };

  const handleDoubleClick = (i: number) => {
    if (isLogin === false || state[i] !== "" || winner !== "" || character !== "X") return;
    
    if (!turnO) {
      let newValueArray = [...state];
      newValueArray[i] = "X";
      setState(newValueArray);

      setTurnO(true);

      let newCountX = [...countX];
      newCountX.pop();
      setCountX(newCountX);

      setDrawCountState((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    setCurrentTurn(turnO ? "Current Turn - O" : "Current Turn - X");
  }, [turnO]);

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  const handleResetData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .update({
        state: initialValue,
        turnO: turnO,
        winReload: 0,
        winner: "",
        countO: initialO,
        countX: initialX,
        countScoreO: countScoreO,
        countScoreX: countScoreX,
        countScoreDraw: countScoreDraw,
        drawCountState: 9,
        currentTurn: currentTurn,
      })
      .eq("id", GameID);

    return supares;
  };

  const { refetch: ResetRefetch } = useQuery("reset-data", handleResetData, {
    enabled: false,
    onSettled() {
      queryClient.invalidateQueries("get-score-data");
    },
  });

  const handleReset = async () => {
    if(isLogin === false) return

    setState(initialValue);
    setWinner("");
    setCountO(initialO);
    setCountX(initialX);
    setDrawCountState(9);
    setWinReload(0);
    await ResetRefetch();
  };

  const handleDeleteData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .delete()
      .eq("id", GameID);

    return supares;
  };

  const { refetch: DeleteGameRefetch } = useQuery(
    "delete-game-data",
    handleDeleteData,
    {
      enabled: false,
    }
  );

  const handleResetGame = async () => {
    if(isLogin === false) return

    await DeleteGameRefetch();
    setCharacter(undefined)
    navigate("/");
  };

  const hidden: React.CSSProperties =
    winner === ""
      ? drawCountState !== 10
        ? { visibility: "hidden" }
        : { visibility: "visible" }
      : { visibility: "visible" };

  const handleGetScoreData = async () => {
    const supares = await Supabase.from("tic-tac-toe")
      .select()
      .eq("id", GameID)
      .single();

    const data = supares.data as GetSingleUserData;

    return data;
  };

  const {
    data: ScoreData,
    refetch: scoreRefetch,
    isFetching,
  } = useQuery("get-score-data", handleGetScoreData, {
    keepPreviousData: true,
    refetchInterval: 10000,
    onSettled() {
      queryClient.invalidateQueries("update-data");
    },
  });

  console.log("fetching score", isFetching);

  const winnerAnnounce = () => {
    return ScoreData?.winner === "" ? ScoreData.currentTurn : ScoreData?.winner;
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      {!character && (
        <div>
          <h2 className="my-3 text-[30px]">Enter your character</h2>
          <div className="w-full flex justify-center flex-row">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="'O' or 'X'"
              className="text-green-600 px-3"
            />
            <button
              onClick={handleCharater}
              className="border border-black mx-2 px-3 rounded-md"
            >
              Select
            </button>
          </div>
          {value !== "" && value !== "X" && value !== "O" && (
            <p className="my-2 text-red-600">Enter the correct choice</p>
          )}
        </div>
      )}
      {character && ScoreData && (
        <div>
          <h2 className="w-full text-start text-[20px] flex items-center">GameID: <span className=" text-green-700 text-[30px] ml-1">{GameID}</span></h2>
          <div className=" w-full flex flex-row justify-around">
            <Score character="O" score={ScoreData.countScoreO} />
            <Score character="Draw" score={ScoreData.countScoreDraw} />
            <Score character="X" score={ScoreData.countScoreX} />
          </div>
          <div className="w-full flex flex-row justify-evenly items-center">
            <div>
              <Chances chances={ScoreData.countO} />
            </div>
            <div className="flex flex-col">
              <div className="text-center text-[40px] mb-5">
                <CurrentTurn turn={winnerAnnounce()} />
              </div>
              <p className="w-full text-start text-[20px] flex items-center">You are playing as <span className=" text-red-700 text-[30px] ml-1">{character}</span></p>
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
              <div>
                <button
                  style={hidden}
                  className="border border-green-600 mt-[30px] py-[15px] px-[30px] rounded-3xl hover:bg-green-600 "
                  onClick={handleReset}
                >
                  New Game
                </button>
              </div>
            </div>
            <div>
              <Chances chances={ScoreData.countX} />
            </div>
          </div>
          <div className=" w-[80vw] text-end flex flex-col justify-end items-end relative">
            <div className=" absolute bottom-14">
              {menu && (
                <MenuButton
                  resetBoard={handleReset}
                  resetGame={handleResetGame}
                />
              )}
            </div>
            <button onClick={handleMenu}>
              <img src={MenuIcon} alt="Menu" className="w-[57px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
