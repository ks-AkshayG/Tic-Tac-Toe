import { createContext, useContext, useState } from "react"
import { initialO, initialCharacterProps } from "../../constants/ConstantValue"

type CountOContextType = {
    countO: initialCharacterProps
    setCountO: React.Dispatch<React.SetStateAction<initialCharacterProps>>
}
  
export const CountOContext = createContext<CountOContextType | undefined>(undefined)
  
export const useStateCountOContext = () => {
    const value = useContext(CountOContext)

    if(value === undefined){
        throw new Error('Use CountOContext Provider to pass Value')
    }

    return value
}

type CountOContextProviderProps = {
    children: React.ReactNode
}

export const CountOContextProvider = ({children}: CountOContextProviderProps) => {

    const [countO, setCountO] = useState(initialO);

    return (
        <CountOContext.Provider value={{countO, setCountO}} >{children}</CountOContext.Provider>
    )
}