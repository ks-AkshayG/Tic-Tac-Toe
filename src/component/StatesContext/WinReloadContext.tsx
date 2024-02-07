import { useState, useContext, createContext } from "react";

type WinReloadContextType = {
    winReload: number
    setWinReload: React.Dispatch<React.SetStateAction<number>>
}

export const WinReloadContext = createContext<WinReloadContextType | undefined>(undefined)

export const useStateWinReloadContext = () => {
    const value = useContext(WinReloadContext)

    if(value === undefined){
        throw new Error('Use WinReloadContext Provider to pass the Value')
    }

    return value
}

type WinReloadContextProviderProps = {
    children: React.ReactNode
}

export const WinReloadContextProvider = ({children}: WinReloadContextProviderProps) => {

    const [winReload, setWinReload] = useState(0);

    return(
        <WinReloadContext.Provider value={{winReload, setWinReload}} >{children}</WinReloadContext.Provider>
    )
}