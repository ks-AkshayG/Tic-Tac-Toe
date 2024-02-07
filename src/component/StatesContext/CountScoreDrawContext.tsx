import { useState, useContext, createContext } from "react";

type CountScoreDrawContextType = {
    countScoreDraw: number
    setCountScoreDraw: React.Dispatch<React.SetStateAction<number>>
}

export const CountScoreDrawContext = createContext<CountScoreDrawContextType | undefined>(undefined)

export const useStateCountScoreDrawContext = () => {
    const value = useContext(CountScoreDrawContext)

    if(value === undefined){
        throw new Error('Use CountScoreDrawContext Provider to pass the Value')
    }

    return value
}

type CountScoreDrawContextProviderProps = {
    children: React.ReactNode
}

export const CountScoreDrawContextProvider = ({children}: CountScoreDrawContextProviderProps) => {

    const [countScoreDraw, setCountScoreDraw] = useState(0);

    return(
        <CountScoreDrawContext.Provider value={{countScoreDraw, setCountScoreDraw}} >{children}</CountScoreDrawContext.Provider>
    )
}