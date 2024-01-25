import { useState, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import SingleSquareBoard from './SingleSquareBoard'
import CurrentTurn from "./CurrentTurn"
import Chances from './Chances'
import Score from './Score'
import MenuButton from './MenuButton'

import MenuIcon from '../assets/bx-menu.svg'

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
    id: 1,
    value: 'X'
  },
  {
    id: 2,
    value: 'X'
  },
  {
    id: 3,
    value: 'X'
  },
  {
    id: 4,
    value: 'X'
  },
  {
    id: 5,
    value: 'X'
  }
]

const GameBoard = () => {

  const [menu, setMenu] = useState(false)

  const [winReload, setWinReload] = useLocalStorage('winO', 0)

  const [state, setState] = useLocalStorage('state', initialValue)
  const [turnO, setTurnO] = useLocalStorage('tornO', true)
  const [winner, setWinner] = useLocalStorage('winner', '')
  const [countO, setCountO] = useLocalStorage('countO', initialO);
  const [countX, setCountX] = useLocalStorage('countX', initialX);
  const [countScoreO, setCountScoreO] = useLocalStorage('countScoreO', 0);
  const [countScoreX, setCountScoreX] = useLocalStorage('countScoreX', 0);
  const [countScoreDraw, setCountScoreDraw] = useLocalStorage('countScoreDraw', 0)
  const [drawCountState, setDrawCountState] = useLocalStorage('drawCountState', 9)

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

  let character: string = ''
  
  const handleScore = () => {
      for(let i = 0; i < winConditions.length; i++){
        let [a,b,c] = winConditions[i]
        if((state[a] !== '') && (state[a] === state[b]) && (state[a] === state[c])){
          setWinner(`Congratulations! ${state[a]} Won`)
          character = state[a]

          return 'done'
        }
      }
      return ''
  }

  let handleLocalstorageScore = () => {
    let score = handleScore()
    if(score === 'done'){

      if(winReload === 0){
        if(character === 'O') setCountScoreO(prevCount => prevCount + 1) 
        if(character === 'X') setCountScoreX(prevCount => prevCount + 1)
        setWinReload(1)
      }
    }
    if((drawCountState === 0) && (winner === '')) {

      setCountScoreDraw(prevState => prevState + 1)
      setDrawCountState(10)
    } 
  }
  
  useEffect(() => {
    handleLocalstorageScore()
  }, [turnO])

  let handleClick = (i: number, e: number ) => {
  
    if(state[i] !== "") return
    if(winner !== "") return

    if(turnO){
      let newValueArray = [...state]
      newValueArray[i] = 'O'
      setState(newValueArray)
      setTurnO(prevState => !prevState)
      let newCountO = [...countO]
      newCountO.pop()
      setCountO(newCountO)
      setDrawCountState(prevCount => prevCount - 1)
    }else if(!turnO && (e == 2)){
      let newValueArray = [...state]
      newValueArray[i] = 'X'
      setState(newValueArray)
      setTurnO(prevState => !prevState)
      let newCountX = [...countX]
      newCountX.pop()
      setCountX(newCountX)
      setDrawCountState(prevCount => prevCount - 1)
    }
  }

  let handleMenu = () => {
    setMenu(prevState => !prevState)
  }

  let currentTurn = turnO ? "Current Turn - O" : "Current Turn - X"

  let winnerGreet = winner !== '' ? winner : currentTurn
  
  if((drawCountState === 10) && (winner === '')) winnerGreet = 'Match Draw'
  
  let handleReset = () => {
    setState(initialValue)
    setWinner('') 
    setCountO(initialO)
    setCountX(initialX)
    setDrawCountState(9)
    setWinReload(0)
  }

  let handleClearScore = () => {
    setCountScoreO(0)
    setCountScoreX(0)
    setCountScoreDraw(0)
    handleReset()
  }
  
  let hidden: React.CSSProperties = (winner === '') ? (drawCountState !== 10) ? {visibility: 'hidden'} : {visibility: 'visible'} : {visibility: 'visible'}

  return (
    <div className=' w-full flex flex-col justify-center items-center'>
      <div className=' w-full flex flex-row justify-around'>
        <Score character = 'O' value = {countScoreO} />
        <Score character = 'Draw' value = {countScoreDraw} />
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
            <SingleSquareBoard onClick = {(e) => handleClick(0, e.detail)} value={state[0]} />
            <SingleSquareBoard onClick = {(e) => handleClick(1,e.detail)} value={state[1]} />
            <SingleSquareBoard onClick = {(e) => handleClick(2,e.detail)} value={state[2]} />
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleSquareBoard onClick = {(e) => handleClick(3,e.detail)} value={state[3]} />
            <SingleSquareBoard onClick = {(e) => handleClick(4,e.detail)} value={state[4]} />
            <SingleSquareBoard onClick = {(e) => handleClick(5,e.detail)} value={state[5]} />
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleSquareBoard onClick = {(e) => handleClick(6,e.detail)} value={state[6]} />
            <SingleSquareBoard onClick = {(e) => handleClick(7,e.detail)} value={state[7]} />
            <SingleSquareBoard onClick = {(e) => handleClick(8,e.detail)} value={state[8]} />
          </div>
          <div>
            <button style={hidden} className='border border-green-600 mt-[30px] py-[15px] px-[30px] rounded-3xl hover:bg-green-600 ' onClick={handleReset} >New Game</button>
          </div>
        </div>
        <div>
          <Chances value = {countX} />
        </div> 
      </div>
      <div className=' w-[80vw] text-end flex flex-col justify-end items-end relative'>
        <div className=' absolute bottom-14'>
          { 
            menu && <MenuButton resetBoard = {handleReset} resetGame = {handleClearScore} />
          }
        </div>
        <button onClick={handleMenu}>
          <img src={MenuIcon} alt="Menu" className='w-[57px]' />
        </button>
      </div>
    </div>
  )
}

export default GameBoard