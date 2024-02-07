export type initialCharacterProps = {
    id: number
    value: string
  }[]
  
  export const initialValue: string[] = new Array(9).fill('')
  export const initialO: initialCharacterProps = [
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
  ]
  export const initialX: initialCharacterProps = [
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
  ]
  
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