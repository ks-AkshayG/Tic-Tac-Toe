import { Button } from "./ui/button"

type SingleSquareBoardProps = {
  onClick?: () => void  
  onDoubleClick?: () => void
  value: string
}

const SingleSquareBoard = ({onClick, onDoubleClick, value}: SingleSquareBoardProps) => {

  return (
    <Button className='w-[170px] h-[170px] border-4 border-gray-300 text-[130px] cursor-pointer ' onClick={onClick} onDoubleClick={onDoubleClick}>
        {value}
    </Button>
  )
}

export default SingleSquareBoard