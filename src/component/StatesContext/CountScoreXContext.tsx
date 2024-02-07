import { useState, useContext, createContext } from "react";

type CountScoreXContextType = {
    countScoreX: number
    setCountScoreX: React.Dispatch<React.SetStateAction<number>>
}

export const CountScoreXContext = createContext<CountScoreXContextType | undefined>(undefined)

export const useStateCountScoreXContext = () => {
    const value = useContext(CountScoreXContext)

    if(value === undefined){
        throw new Error('Use CountScoreXContext Provider to pass the Value')
    }

    return value
}

type CountScoreXContextProviderProps = {
    children: React.ReactNode
}

export const CountScoreXContextProvider = ({children}: CountScoreXContextProviderProps) => {

    const [countScoreX, setCountScoreX] = useState(0);

    return(
        <CountScoreXContext.Provider value={{countScoreX, setCountScoreX}} >{children}</CountScoreXContext.Provider>
    )
}