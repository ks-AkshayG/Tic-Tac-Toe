import { createContext, useContext, useState } from "react"
import { initialValue } from "../../constants/ConstantValue";

type StateContextType = {
    state: string[]
    setState: React.Dispatch<React.SetStateAction<string[]>>
}
  
export const StateContext = createContext<StateContextType | undefined>(undefined)
  
export const useStateStateContext = () => {
    const value = useContext(StateContext)

    if(value === undefined){
        throw new Error('Use StateContext Provider to pass Value')
    }

    return value
}

type StateContextProviderProps = {
    children: React.ReactNode
}

export const StateContextProvider = ({children}: StateContextProviderProps) => {

    const [state, setState] = useState(initialValue);

    return (
        <StateContext.Provider value={{state, setState}} >{children}</StateContext.Provider>
    )
}