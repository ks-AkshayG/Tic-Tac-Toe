import { useEffect } from 'react'
import SingleSquareBoard from './SingleSquareBoard'
import CurrentTurn from "./CurrentTurn"
import Chances from './Chances'
import Score from './Score'
import MenuButton from './MenuButton'
import MenuIcon from '../assets/bx-menu.svg'

import { atom, useAtom } from 'jotai'

import { ChancesContext } from './Context/ChachesContext'
import { ScoreContext } from './Context/ScoreContext'
import { CurrentTurnContext } from './Context/CurrentTurnContext'
import { MenuContext } from './Context/MenuContext'
import { SingleBoardContext } from './Context/SingleBoardContext'

export type initialCharacterProps = {
  id: number
  value: string
}[]

const intialValueAtom = atom(new Array(9).fill(''))
const menuAtom = atom(false)
const turn0Atom = atom(true)
const winReloadAtom = atom(0)
const winnerAtom = atom('')
const countScoreOAtom = atom(0)
const countScoreXAtom = atom(0)
const countScoreDrawAtom = atom(0)
const drawCountStateAtom = atom(9)
const initialOAtom = atom([
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
])
const initialXAtom = atom([
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
])

export const initialValue: string[] = new Array(9).fill('')
export const initialO: initialCharacterProps = [
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
export const initialX: initialCharacterProps = [
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

export const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const GameBoard = () => {

  const [state, setState] = useAtom(intialValueAtom)
  const [menu, setMenu] = useAtom(menuAtom)
  const [turnO, setTurnO] = useAtom(turn0Atom)
  const [winReload, setWinReload] = useAtom(winReloadAtom)
  const [winner, setWinner] = useAtom(winnerAtom)
  const [countO, setCountO] = useAtom(initialOAtom)
  const [countX, setCountX] = useAtom(initialXAtom)
  const [countScoreO, setCountScoreO] = useAtom(countScoreOAtom)
  const [countScoreX, setCountScoreX] = useAtom(countScoreXAtom)
  const [countScoreDraw, setCountScoreDraw] = useAtom(countScoreDrawAtom)
  const [drawCountState, setDrawCountState] = useAtom(drawCountStateAtom)

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
        <ScoreContext.Provider value={{character:'O', value:countScoreO}} ><Score /></ScoreContext.Provider>
        <ScoreContext.Provider value={{character:'Draw', value:countScoreDraw}} ><Score /></ScoreContext.Provider>
        <ScoreContext.Provider value={{character:'X', value:countScoreX}} ><Score /></ScoreContext.Provider>
      </div>
      <div className='w-full flex flex-row justify-evenly items-center'>
        <div>
          <ChancesContext.Provider value={countO}><Chances /></ChancesContext.Provider>
        </div>
        <div className='flex flex-col'>
          <div className='text-center text-[40px] mb-5'>
            <CurrentTurnContext.Provider value={winnerGreet} ><CurrentTurn /></CurrentTurnContext.Provider>
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(0, e.detail), value:state[0]}}><SingleSquareBoard /></SingleBoardContext.Provider>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(1, e.detail), value:state[1]}}><SingleSquareBoard /></SingleBoardContext.Provider>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(2, e.detail), value:state[2]}}><SingleSquareBoard /></SingleBoardContext.Provider>
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(3, e.detail), value:state[3]}}><SingleSquareBoard /></SingleBoardContext.Provider>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(4, e.detail), value:state[4]}}><SingleSquareBoard /></SingleBoardContext.Provider>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(5, e.detail), value:state[5]}}><SingleSquareBoard /></SingleBoardContext.Provider>
          </div>
          <div className='flex justify-center items-center flex-row text-[100px]'>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(6, e.detail), value:state[6]}}><SingleSquareBoard /></SingleBoardContext.Provider>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(7, e.detail), value:state[7]}}><SingleSquareBoard /></SingleBoardContext.Provider>
            <SingleBoardContext.Provider value={{onClick:(e) => handleClick(8, e.detail), value:state[8]}}><SingleSquareBoard /></SingleBoardContext.Provider>
          </div>
          <div>
            <button style={hidden} className='border border-green-600 mt-[30px] py-[15px] px-[30px] rounded-3xl hover:bg-green-600 ' onClick={handleReset} >New Game</button>
          </div>
        </div>
        <div>
          <ChancesContext.Provider value={countX}><Chances /></ChancesContext.Provider>
        </div> 
      </div>
      <div className=' w-[80vw] text-end flex flex-col justify-end items-end relative'>
        <div className=' absolute bottom-14'>
          { 
            menu && (
            <MenuContext.Provider value={{resetBoard:handleReset, resetGame:handleClearScore}}><MenuButton /></MenuContext.Provider>)
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