import { useCurrentTurnContext } from "./Context/CurrentTurnContext"

const CurrentTurn = () => {

  const value = useCurrentTurnContext()

  return (
    <div><span className=' text-cyan-500 text-[40px] '>{value}</span></div>
  )
}

export default CurrentTurn  