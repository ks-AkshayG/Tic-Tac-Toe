import { createContext, useContext } from "react";
type scoreProps = {
    character: "O" | "X" | "Draw"
    value: number
  }

export const ScoreContext = createContext<scoreProps | undefined>(undefined)

export const useScoreContext = () => {
    const value = useContext(ScoreContext)

    if(value === undefined){
        throw new Error('Use ScoreContext Provider')
    }

    return value
}