import { createContext, useContext } from "react";
import { MouseEventHandler } from "react"

type valueProps = {
    value: string | null
    onClick: MouseEventHandler<HTMLDivElement>
}

export const SingleBoardContext = createContext<valueProps | undefined>(undefined)

export const useSingleBoardContext = () => {
    const value = useContext(SingleBoardContext)

    if(value === undefined){
        throw new Error('Use SingleBoardContext Provider to pass Value')
    }

    return value
}