import { useState, useContext, createContext } from "react";

type WinnerContextType = {
    winner: string
    setWinner: React.Dispatch<React.SetStateAction<string>>
}

export const WinnerContext = createContext<WinnerContextType | undefined>(undefined)

export const useStateWinnerContext = () => {
    const value = useContext(WinnerContext)

    if(value === undefined){
        throw new Error('Use WinnerContext Provider to pass the Value')
    }

    return value
}

type WinnerContextProviderProps = {
    children: React.ReactNode
}

export const WinnerContextProvider = ({children}: WinnerContextProviderProps) => {

    const [winner, setWinner] = useState('');

    return(
        <WinnerContext.Provider value={{winner, setWinner}} >{children}</WinnerContext.Provider>
    )
}