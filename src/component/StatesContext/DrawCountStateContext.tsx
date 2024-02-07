import { useState, useContext, createContext } from "react";

type DrawCountStateContextType = {
    drawCountState: number
    setDrawCountState: React.Dispatch<React.SetStateAction<number>>
}

export const DrawCountStateContext = createContext<DrawCountStateContextType | undefined>(undefined)

export const useStateDrawCountStateContext = () => {
    const value = useContext(DrawCountStateContext)

    if(value === undefined){
        throw new Error('Use DrawCountStateContext Provider to pass the Value')
    }

    return value
}

type DrawCountStateContextProviderProps = {
    children: React.ReactNode
}

export const DrawCountStateContextProvider = ({children}: DrawCountStateContextProviderProps) => {

    const [drawCountState, setDrawCountState] = useState(9);

    return(
        <DrawCountStateContext.Provider value={{drawCountState, setDrawCountState}} >{children}</DrawCountStateContext.Provider>
    )
}
