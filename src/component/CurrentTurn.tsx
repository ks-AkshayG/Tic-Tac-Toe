type currentTurnProps = {
  value: string
}

const CurrentTurn = ({value}: currentTurnProps) => {
  return (
    <div><span className=' text-cyan-500 text-[40px] '>{value}</span></div>
  )
}

export default CurrentTurn  