import { useSingleBoardContext } from "./Context/SingleBoardContext"

const SingleSquareBoard = () => {

  const {onClick, value} = useSingleBoardContext()

  return (
    <div className='w-[170px] h-[170px] border-4 border-zinc-900 px-[50px] cursor-pointer' onClick={onClick}>
        {value}
    </div>
  )
}

export default SingleSquareBoard