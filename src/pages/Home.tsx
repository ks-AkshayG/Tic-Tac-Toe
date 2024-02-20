import { Link } from "react-router-dom";
import { useQuery } from "react-query"
import { Supabase } from "../config/supabase";
import { initialO, initialValue, initialX } from "../constants/ConstantValue";

export type GetDataResponceType = {
    id: number
    created_at: string
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
}[]

const Home = () => {

    const handleCreateData = async() => {
        const supares = await Supabase
            .from('tic-tac-toe')
            .insert({
                state: initialValue,
                turnO: true,
                winReload: 0,
                winner: '',
                countO: initialO,
                countX: initialX,
                countScoreO: 0,
                countScoreX: 0,
                countScoreDraw: 0,
                drawCountState: 9,
                currentTurn: 'Current Turn - O'
            })
            .select() //single

        const data = supares.data as GetDataResponceType
        return data
    }

    const { data } = useQuery('create-game-data', handleCreateData, {
        enabled: true
    })

    
    const handleGetData = async() => {
        console.log('created')
        console.log(data)
    }

  return (
    <div>
      <h1 className="w-full text-[70px] text-lime-600">Tic - Tac - Toe</h1>

      {
        data?.map((data) => ( //useNavigate
        <Link to={`/tictactoe/${data.id}`} key={data.id}>
            <button className="border border-black py-1 px-3 rounded-xl text-[30px] hover:text-green-600 hover:border-green-600" onClick={handleGetData}>New Game</button>
        </Link>
        ))
      }
      
    </div>
  );
};

export default Home;
