type ScoreProps = {
  character: string
  score: number
}

const Score = ({character, score}: ScoreProps) => {

  return (
    <div>
        <div className='text-center text-[90px]'> {character} <span className='text-[30px] underline'>{score}</span></div>
    </div>
  )
}

export default Score