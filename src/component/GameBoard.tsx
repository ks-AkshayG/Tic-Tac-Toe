import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { roomIDAtom, countAtom } from "../pages/Home";

import SingleSquareBoard from "./SingleSquareBoard";
import CurrentTurn from "./CurrentTurn";
import Chances from "./Chances";
import Score from "./Score";
import MenuButton from "./MenuButton";
import MenuIcon from "../assets/bx-menu.svg";

import {
  initialValue,
  initialO,
  initialX,
  winConditions,
} from "../constants/ConstantValue";
import { DataType, ResetDataType } from "../types/dataTypes";
import { Socket } from "socket.io-client";

// -----------------------------------------------------------------

type GameBoardProps = {
  socket: Socket
}

const GameBoard = ({socket }: GameBoardProps) => {

  const navigate = useNavigate();

  const [room] = useAtom(roomIDAtom);
  const [count, setCount] = useAtom(countAtom)

  // console.log(room)

  const [state, setState] = useState(initialValue);
  const [menu, setMenu] = useState(false);
  const [turnO, setTurnO] = useState(true);
  const [winReload, setWinReload] = useState(0);
  const [winner, setWinner] = useState("");
  const [countO, setCountO] = useState(initialO);
  const [countX, setCountX] = useState(initialX);
  const [countScoreO, setCountScoreO] = useState(0);
  const [countScoreX, setCountScoreX] = useState(0);
  const [countScoreDraw, setCountScoreDraw] = useState(0);
  const [drawCountState, setDrawCountState] = useState(9);
  const [currentTurn, setCurrentTurn] = useState(
    turnO ? "Current Turn - O" : "Current Turn - X"
    );
    
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
    handleDraw();
  }, [turnO]);

  const handleClick = (i: number) => {
    if (state[i] !== "") return;
    if (winner !== "") return;

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
    if (state[i] !== "") return;
    if (winner !== "") return;

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
    socket.emit("send_data", {
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
    }, room);
    // console.log("data passed");
  }, [currentTurn]);

  useEffect(() => {
    setCurrentTurn(turnO ? "Current Turn - O" : "Current Turn - X");
    // console.log('current turn changed', currentTurn)
  }, [turnO]);

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  useEffect(() => {
    socket.on("received_reset_data", (resetData: ResetDataType) => {
      setState(resetData.state);
      setWinner(resetData.winner);
      setCountO(resetData.countO);
      setCountX(resetData.countX);
      setDrawCountState(resetData.drawCountState);
      setWinReload(resetData.winReload);
    })
  }, [])

  const handleReset = async () => {
    socket.emit("send_reset_data", {
      state: initialValue,
      winner: "",
      countO: initialO,
      countX: initialX,
      drawCountState: 9,
      winReload: 0
    }, room)

    socket.on("received_reset_data", (resetData: ResetDataType) => {
      // console.log('data reset')
      setState(resetData.state);
      setWinner(resetData.winner);
      setCountO(resetData.countO);
      setCountX(resetData.countX);
      setDrawCountState(resetData.drawCountState);
      setWinReload(resetData.winReload);
    })
  };

  const handleResetGame = async () => {
    socket.emit("disconnect_room", room, (response: any) => {
      if(response){
        setCount(prevstate => prevstate - 1)
        navigate("/");
      }
    })
  };

  const hidden: React.CSSProperties =
    winner === ""
      ? drawCountState !== 10
        ? { visibility: "hidden" }
        : { visibility: "visible" }
      : { visibility: "visible" };

  useEffect(() => {
    socket.on("received_data", (data: DataType) => {
      // console.log('data received')
      setState(data.state)
      setTurnO(data.turnO)
      setWinReload(data.winReload)
      setWinner(data.winner)
      setCountO(data.countO)
      setCountX(data.countX)
      setCountScoreO(data.countScoreO)
      setCountScoreX(data.countScoreX)
      setCountScoreDraw(data.countScoreDraw)
      setDrawCountState(data.drawCountState)
      setCurrentTurn(data.currentTurn)

      // console.log(data)
    });
  }, [currentTurn]);

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className=" w-full flex flex-row justify-around">
        <Score character="O" score={countScoreO} />
        <Score character="Draw" score={countScoreDraw} />
        <Score character="X" score={countScoreX} />
      </div>

      <div className="w-full flex flex-row justify-evenly items-center">
        <div>
          <Chances chances={countO} />
        </div>

        <div className="flex flex-col">
          <div className="text-center text-[40px] mb-5">
            <CurrentTurn turn={winner === '' ? currentTurn : winner} />
          </div>
          <div className="flex justify-center items-center flex-row text-[100px]">
            <SingleSquareBoard
              value={state[0]}
              onClick={() => handleClick(0)}
              onDoubleClick={() => handleDoubleClick(0)}
            />
            <SingleSquareBoard
              value={state[1]}
              onClick={() => handleClick(1)}
              onDoubleClick={() => handleDoubleClick(1)}
            />
            <SingleSquareBoard
              value={state[2]}
              onClick={() => handleClick(2)}
              onDoubleClick={() => handleDoubleClick(2)}
            />
          </div>
          <div className="flex justify-center items-center flex-row text-[100px]">
            <SingleSquareBoard
              value={state[3]}
              onClick={() => handleClick(3)}
              onDoubleClick={() => handleDoubleClick(3)}
            />
            <SingleSquareBoard
              value={state[4]}
              onClick={() => handleClick(4)}
              onDoubleClick={() => handleDoubleClick(4)}
            />
            <SingleSquareBoard
              value={state[5]}
              onClick={() => handleClick(5)}
              onDoubleClick={() => handleDoubleClick(5)}
            />
          </div>
          <div className="flex justify-center items-center flex-row text-[100px]">
            <SingleSquareBoard
              value={state[6]}
              onClick={() => handleClick(6)}
              onDoubleClick={() => handleDoubleClick(6)}
            />
            <SingleSquareBoard
              value={state[7]}
              onClick={() => handleClick(7)}
              onDoubleClick={() => handleDoubleClick(7)}
            />
            <SingleSquareBoard
              value={state[8]}
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
          <Chances chances={countX} />
        </div>
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
