import { useState, useContext, createContext } from "react";

type Turn0ContextType = {
    turnO: boolean
    setTurnO: React.Dispatch<React.SetStateAction<boolean>>
}

export const TurnOContext = createContext<Turn0ContextType | undefined>(undefined)

export const useStateTurnOContext = () => {
    const value = useContext(TurnOContext)
    
    if(value === undefined){
        throw new Error('Use TurnOContext Provider to pass the Value')
    }
    
    return value
}

type TurnOContextProviderProps = {
    children: React.ReactNode
}

export const Turn0ContextProvider = ({children}: TurnOContextProviderProps) => {
    
    const [turnO, setTurnO] = useState(true);
    
    return (
        <TurnOContext.Provider value={{turnO, setTurnO}} >{children}</TurnOContext.Provider>
    )
}