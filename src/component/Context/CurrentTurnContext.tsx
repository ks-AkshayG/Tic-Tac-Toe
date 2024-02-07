import { createContext, useContext } from "react";

export const CurrentTurnContext = createContext<string | undefined>(undefined)

export const useCurrentTurnContext = () => {
    const value = useContext(CurrentTurnContext)

    if(value === undefined){
        throw new Error('Use CurrentTurnContext Provider to pass Value')
    }

    return value
}