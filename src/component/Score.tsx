import { useScoreContext } from "./Context/ScoreContext"

const Score = () => {

  const {character, value} = useScoreContext()

  return (
    <div>
        <div className='text-center text-[90px]'> {character} <span className='text-[30px] underline'>{value}</span></div>
    </div>
  )
}

export default Score