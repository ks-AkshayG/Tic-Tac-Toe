import GameBoard from '../component/GameBoard'
import { Supabase } from '../config/supabase'
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export type GetSingleUserData = {
    id: number
    created_at: string
    state: string[]
    turnO: boolean
    winReload: number
    winner: string
    countO: number
    countX: number
    countScoreO: number
    countScoreX: number
    countScoreDraw: number
    drawCountState: number
    currentTurn: string
  }

const Game = () => {

    const { GameID } = useParams()

    const handleGetData = async() => {
        const supares = await Supabase
            .from('tic-tac-toe')
            .select()
            .eq('id', GameID)
            .single()

        const data = supares.data as GetSingleUserData
        // console.log('supabase data', data)

        return data
    }

    const { data } = useQuery('get-all-data', handleGetData, {
        keepPreviousData: true,
        refetchInterval: 5000
    })

    // console.log("query data", data)

  return (
    <div>
        {
            data && <GameBoard data={data} />
        }
    </div>
  )
}

export default Game