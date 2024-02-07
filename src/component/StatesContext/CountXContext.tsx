import { createContext, useContext, useState } from "react"
import { initialX } from "../GameBoard";
import { initialCharacterProps } from "../GameBoard";

type CountXContextType = {
    countX: initialCharacterProps
    setCountX: React.Dispatch<React.SetStateAction<initialCharacterProps>>
}
  
export const CountXContext = createContext<CountXContextType | undefined>(undefined)
  
export const useStateCountXContext = () => {
    const value = useContext(CountXContext)

    if(value === undefined){
        throw new Error('Use CountXContext Provider to pass Value')
    }

    return value
}

type CountXContextProviderProps = {
    children: React.ReactNode
}

export const CountXContextProvider = ({children}: CountXContextProviderProps) => {

    const [countX, setCountX] = useState(initialX);

    return (
        <CountXContext.Provider value={{countX, setCountX}} >{children}</CountXContext.Provider>
    )
}