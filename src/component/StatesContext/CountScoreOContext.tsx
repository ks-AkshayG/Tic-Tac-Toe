import { useState, useContext, createContext } from "react";

type CountScoreOContextType = {
    countScoreO: number
    setCountScoreO: React.Dispatch<React.SetStateAction<number>>
}

export const CountScoreOContext = createContext<CountScoreOContextType | undefined>(undefined)

export const useStateCountScoreOContext = () => {
    const value = useContext(CountScoreOContext)

    if(value === undefined){
        throw new Error('Use CountScoreOContext Provider to pass the Value')
    }

    return value
}

type CountScoreOContextProviderProps = {
    children: React.ReactNode
}

export const CountScoreOContextProvider = ({children}: CountScoreOContextProviderProps) => {

    const [countScoreO, setCountScoreO] = useState(0);

    return(
        <CountScoreOContext.Provider value={{countScoreO, setCountScoreO}} >{children}</CountScoreOContext.Provider>
    )
}