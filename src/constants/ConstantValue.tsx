export const initialValue: string[] = new Array(9).fill('')
export const initialO: string[] = ["O","O","O","O","O"]
export const initialX: string[] = ["X","X","X","X","X"]

export const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]