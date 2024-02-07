import { createContext, useContext } from "react";

type menuButtonProps = {
    resetBoard: () => void
    resetGame: () => void
}

export const MenuContext = createContext<menuButtonProps | undefined>(undefined)

export const useMenuContext = () => {
    const value = useContext(MenuContext)

    if(value === undefined){
        throw new Error('Use MenuContext Provider to pass Value')
    }

    return value
}