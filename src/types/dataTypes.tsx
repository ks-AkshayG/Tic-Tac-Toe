export type DataType = {
    state: string[]
    turnO: boolean
    winReload: number
    winner: string
    countO: string[]
    countX: string[]
    countScoreO: number
    countScoreX: number
    countScoreDraw: number
    drawCountState: number
    currentTurn: string
}

export type ResetDataType = {
    state: string[],
    winner: string,
    countO: string[],
    countX: string[],
    drawCountState: number,
    winReload: number
}

export type ClearScoreDataType = {
    countScoreO: number
    countScoreX: number
    countScoreDraw: number
}