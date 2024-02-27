import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { UserDataType } from "../types/UserDataType"

export const initialValueAtom = atomWithStorage('state', new Array(9).fill(''))
export const menuAtom = atom(false)
export const turn0Atom = atomWithStorage('tornO', true)
export const winReloadAtom = atomWithStorage('winO', 0)
export const winnerAtom = atomWithStorage('winner', '')
export const countScoreOAtom = atomWithStorage('countScoreO', 0)
export const countScoreXAtom = atomWithStorage('countScoreX', 0)
export const countScoreDrawAtom = atomWithStorage('countScoreDraw', 0)
export const drawCountStateAtom = atomWithStorage('drawCountState', 9)
export const initialOAtom = atomWithStorage('countO', ["O","O","O","O","O"])
export const initialXAtom = atomWithStorage('countX', ["X","X","X","X","X"])

export const loginEmailAtom = atom("")
export const loginPasswordAtom = atom("")

export const registerUsernameAtom = atom("")
export const registerEmailAtom = atom("")
export const registerPasswordAtom = atom("")

export const isLoginAtom = atomWithStorage('login', false)
export const userDataAtom = atom<undefined | UserDataType>(undefined)