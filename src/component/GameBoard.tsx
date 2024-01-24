import {useState, useEffect} from 'react'
import SingleSquareBoard from './SingleSquareBoard'
import CurrentTurn from "./CurrentTurn"
import Chances from './Chances'
import Score from './Score'

type initialCharacterProps = {
  id: number
  value: string
}[]

let initialValue: string[] = new Array(9).fill('')
let initialO: initialCharacterProps = [
  {
    id: 0,
    value: 'O'
  },
  {
    id: 1,
    value: 'O'
  },
  {
    id: 2,
    value: 'O'
  },
  {
    id: 3,
    value: 'O'
  },
  {
    id: 4,
    value: 'O'
  }
]
let initialX: initialCharacterProps = [
  {
    id: 5,
    value: 'X'
  },
  {
    id: 6,
    value: 'X'
  },
  {
    id: 7,
    value: 'X'
  },
  {
    id: 8,
    value: 'X'
  },
  {
    id: 9,
    value: 'X'
  }
]

console.log(initialO)
// let initialX: string[] = new Array(5).fill('X')

const GameBoard = () => {

  const [state, setState] = useState(initialValue)
  const [turnO, setTurnO] = useState(true)
  const [winner, setWinner] = useState('')
  const [countO, setCountO] = useState(initialO);
  const [countX, setCountX] = useState(initialX);
  const [countScoreO, setCountScoreO] = useState(0);
  const [countScoreX, setCountScoreX] = useState(0);
  const [drawCount, setDrawCount] = useState(9)

  // console.log(countO)

  useEffect(() => {
    for(let i = 0; i < winConditions.length; i++){
      let [a,b,c] = winConditions[i]
      if((state[a] !== '') && (state[a] === state[b]) && (state[a] === state[c])){
        setWinner(`Congratulations! ${state[a]} Won`)
        if(state[a] === 'O') setCountScoreO(prevCount => prevCount + 1)
        if(state[a] === 'X') setCountScoreX(prevCount => prevCount + 1)
      }
    }
  },[turnO])

  let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  let handleClick = (i: number) => {
  
    if(state[i] !== "") return
    if(winner !== "") return

    if(turnO){
      let newValueArray = [...state]
      newValueArray[i] = 'O'
      setState(newValueArray)
      setTurnO(false)
      let newCountO = [...countO]
      newCountO.pop()
      setCountO(newCountO)
      setDrawCount(prevCount => prevCount - 1)
    }else if(!turnO){
      let newValueArray = [...state]
      newValueArray[i] = 'X'
      setState(newValueArray)
      setTurnO(true)
      let newCountX = [...countX]
      newCountX.pop()
      setCountX(newCountX)
      setDrawCount(prevCount => prevCount - 1)
    }
  }

  let currentTurn = turnO ? "Current Turn - O" : "Current Turn - X"

  let winnerGreet = winner !== '' ? winner : currentTurn
  
  if((drawCount === 0) && (winner === '')) winnerGreet = 'Match Draw'

  let handleReset = () => {
    setState(initialValue)
    setWinner('') 
    setCountO(initialO)
    setCountX(initialX)
    setDrawCount(9)
    winnerGreet = winner !== '' ? winner : currentTurn
  }

  return (
    <div className=' w-full flex flex-col'>
      <div className=' w-full flex flex-row justify-around'>
        <Score character = 'O' value = {countScoreO} />
        <Score character = 'X' value = {countScoreX} />
      </div>
      <div className='w-full flex flex-row justify-evenly items-center'>
        <div>
          <Chances value={countO} />
        </div>
        <div className='flex flex-col'>
          <div className='text-center text-[40px] mb-5'>
            <CurrentTurn value = {winnerGreet} />
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleSquareBoard onClick = {() => handleClick(0)} value={state[0]} />
            <SingleSquareBoard onClick = {() => handleClick(1)} value={state[1]} />
            <SingleSquareBoard onClick = {() => handleClick(2)} value={state[2]} />
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleSquareBoard onClick = {() => handleClick(3)} value={state[3]} />
            <SingleSquareBoard onClick = {() => handleClick(4)} value={state[4]} />
            <SingleSquareBoard onClick = {() => handleClick(5)} value={state[5]} />
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleSquareBoard onClick = {() => handleClick(6)} value={state[6]} />
            <SingleSquareBoard onClick = {() => handleClick(7)} value={state[7]} />
            <SingleSquareBoard onClick = {() => handleClick(8)} value={state[8]} />
          </div>
          <div>
          <button className='border border-green-600 mt-[30px] py-[15px] px-[30px] rounded-3xl hover:bg-green-600 ' onClick={handleReset} >Reset Board</button>
          </div>
        </div>
        <div>
          <Chances value = {countX} />
        </div> 
      </div>
    </div>
  )
}

export default GameBoard