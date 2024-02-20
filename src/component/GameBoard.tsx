import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import SingleSquareBoard from "./SingleSquareBoard";
import CurrentTurn from "./CurrentTurn";
import Chances from "./Chances";
import Score from "./Score";
import MenuButton from "./MenuButton";
import MenuIcon from "../assets/bx-menu.svg";

import { useQuery } from "react-query"
import { Supabase } from "../config/supabase";

import {
  initialValue,
  initialO,
  initialX,
  winConditions,
} from "../constants/ConstantValue";
import { GetSingleUserData } from "../pages/Game";

type GameBoardProps = {
  data: GetSingleUserData
}

const GameBoard = ({data}: GameBoardProps) => {

  const { GameID } = useParams()

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
  const [currentTurn, setCurrentTurn] = useState(data.turnO ? "Current Turn - O" : "Current Turn - X");

  let character: string = "";

  const handleWinner = async() => {
    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i];
      if (data.state[a] !== "" && data.state[a] === data.state[b] && data.state[a] === data.state[c]) {
        setWinner(`Congratulations! ${data.state[a]} Won`);
        character = data.state[a];

        return true;
      }
    }
    if (data.drawCountState === 0 && data.winner === "") {
      setWinner('Match Draw')
      setCountScoreDraw((prevState) => prevState + 1);
      setDrawCountState(10);
    }
    return false;
  };

  let handleScore = async() => {
    let score = await handleWinner();
    if (score) {
      if (data.winReload === 0) {
        if (character === "O") setCountScoreO((prevCount) => prevCount + 1);
        if (character === "X") setCountScoreX((prevCount) => prevCount + 1);
        setWinReload(1);
      }
    }
  };

  useEffect(() => {
    handleScore();
  }, [turnO]);

  let handleClick = (i: number) => {
    if (data.state[i] !== "") return;
    if (data.winner !== "") return;

    if (data.turnO) {
      let newValueArray = [...data.state];
      newValueArray[i] = "O";
      setState(newValueArray);
      
      setTurnO(false);

      let newCountO = [...data.countO];
      newCountO.pop();
      setCountO(newCountO);

      setDrawCountState((prevCount) => prevCount - 1);
    }
  };

  let handleDoubleClick = (i: number) => {
    if (data.state[i] !== "") return;
    if (data.winner !== "") return;

    if (!data.turnO) {
      let newValueArray = [...data.state];
      newValueArray[i] = "X";
      setState(newValueArray);

      setTurnO(true);

      let newCountX = [...data.countX];
      newCountX.pop();
      setCountX(newCountX);

      setDrawCountState((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    setCurrentTurn(data.turnO ? "Current Turn - O" : "Current Turn - X")
  }, [turnO])

  let handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  // let currentTurn = turnO ? "Current Turn - O" : "Current Turn - X";

  // let winnerGreet = winner !== "" ? winner : currentTurn;

  // if (drawCountState === 10 && winner === "") winnerGreet = "Match Draw";

  const handleResetData = async() => {
    const supares = await Supabase
      .from('tic-tac-toe')
      .update({
        state: initialValue,
        turnO: turnO,
        winReload: 0,
        winner: '',
        countO: initialO,
        countX: initialX,
        countScoreO: countScoreO,
        countScoreX: countScoreX,
        countScoreDraw: countScoreDraw,
        drawCountState: 9,
        currentTurn: currentTurn
      })

    return supares
  }

  const { refetch: ResetRefetch } = useQuery('reset-data', handleResetData, {
    enabled: false
  })

  let handleReset = async() => {
    setState(initialValue);
    setWinner("");
    setCountO(initialO);
    setCountX(initialX);
    setDrawCountState(9);
    setWinReload(0);
    await ResetRefetch()
  };

  const handleDeleteData = async() => {
    const supares = await Supabase
      .from('tic-tac-toe')
      .delete()
      .eq('id', GameID)

    return supares
  }

  const { refetch: DeleteGameRefetch } = useQuery('delete-game-data', handleDeleteData, {
    enabled: false
  })

  let handleResetGame = async() => {
    await DeleteGameRefetch()
  };

  let hidden: React.CSSProperties =
    data.winner === ""
      ? data.drawCountState !== 10
        ? { visibility: "hidden" }
        : { visibility: "visible" }
      : { visibility: "visible" };

  const winnerAnnounce = () => {
    return (data.winner === '') ? data.currentTurn : data.winner
  }

  const handleGetScoreData = async() => {
    const supares = await Supabase
      .from('tic-tac-toe')
      .select()
      .eq('id', GameID)
      .single()

    const data = supares.data as GetSingleUserData

    return data
  }

  const { data: ScoreData } = useQuery('get-score-data', handleGetScoreData, {
    keepPreviousData: true,
    // refetchInterval: 10000
  })

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      {
        ScoreData &&
        <div className=" w-full flex flex-row justify-around">

          <Score character="O" score={ScoreData.countScoreO}/>
          <Score character="Draw" score={ScoreData.countScoreDraw}/>
          <Score character="X" score={ScoreData.countScoreX}/>

        </div>
      }
      <div className="w-full flex flex-row justify-evenly items-center">
        {
          ScoreData &&
          <div>
            <Chances chances={ScoreData.countO} />
          </div>
        }
        <div className="flex flex-col">
            <div className="text-center text-[40px] mb-5">
              <CurrentTurn turn={winnerAnnounce()} />
            </div>
          {
            ScoreData &&
            <div className="flex justify-center items-center flex-row text-[100px]">
              
              <SingleSquareBoard value={ScoreData.state[0]} onClick={() => handleClick(0)} onDoubleClick={() => handleDoubleClick(0)} />
              <SingleSquareBoard value={ScoreData.state[1]} onClick={() => handleClick(1)} onDoubleClick={() => handleDoubleClick(1)} />
              <SingleSquareBoard value={ScoreData.state[2]} onClick={() => handleClick(2)} onDoubleClick={() => handleDoubleClick(2)} />

            </div>
          }
          {
            ScoreData &&
            <div className="flex justify-center items-center flex-row text-[100px]">
              
              <SingleSquareBoard value={ScoreData.state[3]} onClick={() => handleClick(3)} onDoubleClick={() => handleDoubleClick(3)} />
              <SingleSquareBoard value={ScoreData.state[4]} onClick={() => handleClick(4)} onDoubleClick={() => handleDoubleClick(4)} />
              <SingleSquareBoard value={ScoreData.state[5]} onClick={() => handleClick(5)} onDoubleClick={() => handleDoubleClick(5)} />

            </div>
          }
          {
            ScoreData &&
            <div className="flex justify-center items-center flex-row text-[100px]">
              
              <SingleSquareBoard value={ScoreData.state[6]} onClick={() => handleClick(6)} onDoubleClick={() => handleDoubleClick(6)} />
              <SingleSquareBoard value={ScoreData.state[7]} onClick={() => handleClick(7)} onDoubleClick={() => handleDoubleClick(7)} />
              <SingleSquareBoard value={ScoreData.state[8]} onClick={() => handleClick(8)} onDoubleClick={() => handleDoubleClick(8)} />

            </div>
          }
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
        {
          ScoreData &&
          <div>
            <Chances chances={ScoreData.countX} />
          </div>
        }
      </div>
      <div className=" w-[80vw] text-end flex flex-col justify-end items-end relative">
        <div className=" absolute bottom-14">
          {menu && (
            <MenuButton resetBoard={handleReset} resetGame={handleResetGame} />
          )}
        </div>
        <button onClick={handleMenu}>
          <img src={MenuIcon} alt="Menu" className="w-[57px]" />
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
