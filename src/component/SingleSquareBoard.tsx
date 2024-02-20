type SingleSquareBoardProps = {
  onClick: () => void  
  onDoubleClick: () => void
  value: string
}

const SingleSquareBoard = ({onClick, onDoubleClick, value}: SingleSquareBoardProps) => {

  return (
    <button className='w-[170px] h-[170px] border-4 border-zinc-900 px-[50px] cursor-pointer' onClick={onClick} onDoubleClick={onDoubleClick}>
        {value}
    </button>
  )
}

export default SingleSquareBoard