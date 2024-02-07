import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const initialValueAtom = atomWithStorage('state', new Array(9).fill(''))
export const menuAtom = atom(false)
export const turn0Atom = atomWithStorage('tornO', true)
export const winReloadAtom = atomWithStorage('winO', 0)
export const winnerAtom = atomWithStorage('winner', '')
export const countScoreOAtom = atomWithStorage('countScoreO', 0)
export const countScoreXAtom = atomWithStorage('countScoreX', 0)
export const countScoreDrawAtom = atomWithStorage('countScoreDraw', 0)
export const drawCountStateAtom = atomWithStorage('drawCountState', 9)
export const initialOAtom = atomWithStorage('countO', [
  {
    id: 0,
    value: 'O'
  },
  {
    id: 1,
    value: 'O'
  },
  {
    id: 2,
    value: 'O'
  },
  {
    id: 3,
    value: 'O'
  },
  {
    id: 4,
    value: 'O'
  }
])
export const initialXAtom = atomWithStorage('countX', [
  {
    id: 1,
    value: 'X'
  },
  {
    id: 2,
    value: 'X'
  },
  {
    id: 3,
    value: 'X'
  },
  {
    id: 4,
    value: 'X'
  },
  {
    id: 5,
    value: 'X'
  }
])