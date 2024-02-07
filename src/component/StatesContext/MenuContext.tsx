import { useState, useContext, createContext } from "react";

type MenuContextType = {
    menu: boolean
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const useStateMenuContext = () => {
    const value = useContext(MenuContext)

    if(value === undefined){
        throw new Error('Use MenuContext Provider to pass the Value')
    }

    return value
}

type MenuContextProviderProps = {
    children: React.ReactNode
}

export const MenuContextProvider = ({children}: MenuContextProviderProps) => {

    const [menu, setMenu] = useState(false);

    return(
        <MenuContext.Provider value={{menu, setMenu}} >{children}</MenuContext.Provider>
    )
}