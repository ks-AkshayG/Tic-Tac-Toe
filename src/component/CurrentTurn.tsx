type CurrentTurnProps = {
  turn: string
}

const CurrentTurn = ({turn}: CurrentTurnProps) => {

  return (
    <div><span className=' text-cyan-500 text-[40px] '>{turn}</span></div>
  )
}

export default CurrentTurn  