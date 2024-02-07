import { useState, useContext, createContext } from "react";
import { initialValue, initialO, initialX, initialCharacterProps } from "../../constants/ConstantValue";

type AllStatesContextType = {
    menu: boolean
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
    winReload: number
    setWinReload: React.Dispatch<React.SetStateAction<number>>
    state: string[]
    setState: React.Dispatch<React.SetStateAction<string[]>>
    turnO: boolean
    setTurnO: React.Dispatch<React.SetStateAction<boolean>>
    winner: string
    setWinner: React.Dispatch<React.SetStateAction<string>>
    countO: initialCharacterProps
    setCountO: React.Dispatch<React.SetStateAction<initialCharacterProps>>
    countX: initialCharacterProps
    setCountX: React.Dispatch<React.SetStateAction<initialCharacterProps>>
    countScoreO: number
    setCountScoreO: React.Dispatch<React.SetStateAction<number>>
    countScoreX: number
    setCountScoreX: React.Dispatch<React.SetStateAction<number>>
    countScoreDraw: number
    setCountScoreDraw: React.Dispatch<React.SetStateAction<number>>
    drawCountState: number
    setDrawCountState: React.Dispatch<React.SetStateAction<number>>
}

export const AllStatesContext = createContext<AllStatesContextType | undefined>(undefined)

export const useAllStatesContext = () => {
    const value = useContext(AllStatesContext)

    if(value === undefined){
        throw new Error('Use AllStateContext Provider to pass Value')
    }

    return value
}

type AllStatesContextProviderProps = {
    children: React.ReactNode
}

export const AllStateContextProvider = ({children}: AllStatesContextProviderProps) => {

    const [menu, setMenu] = useState(false);
    const [winReload, setWinReload] = useState(0);
    const [state, setState] = useState(initialValue);
    const [turnO, setTurnO] = useState(true);
    const [winner, setWinner] = useState('');
    const [countO, setCountO] = useState(initialO);
    const [countX, setCountX] = useState(initialX);
    const [countScoreO, setCountScoreO] = useState(0);
    const [countScoreX, setCountScoreX] = useState(0);
    const [countScoreDraw, setCountScoreDraw] = useState(0);
    const [drawCountState, setDrawCountState] = useState(9);

    return (
        <AllStatesContext.Provider value={{menu, setMenu, winReload, setWinReload, state, setState, turnO, setTurnO, winner, setWinner, countO, setCountO, countX, setCountX, countScoreO, setCountScoreO, countScoreX, setCountScoreX, countScoreDraw, setCountScoreDraw, drawCountState, setDrawCountState }} >{children}</AllStatesContext.Provider>
    )
}