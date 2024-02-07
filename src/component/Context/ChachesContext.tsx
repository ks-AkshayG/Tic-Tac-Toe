import { createContext, useContext } from "react";
import { initialCharacterProps } from "../GameBoard"

export const ChancesContext = createContext<initialCharacterProps | undefined>(undefined)

export const useChancesContext = () => {
    const value = useContext(ChancesContext)

    if(value === undefined){
        throw new Error('Use ChancesContext Provider to pass Value')
    }
    return value
}
