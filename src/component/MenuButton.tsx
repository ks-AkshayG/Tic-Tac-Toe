type MenuButtonProps = {
  resetBoard: () => void
  resetGame: () => void
}

const MenuButton = ({resetBoard, resetGame}: MenuButtonProps) => {

  return (
    <div>
        <ul className=" inline-block">
            <li className="border border-zinc-900 cursor-pointer py-[3px] px-[7px] rounded-lg hover:bg-black hover:text-white" onClick={resetBoard}>New Game</li>
            <li className="border border-zinc-900 cursor-pointer py-[3px] px-[7px] rounded-lg hover:bg-black hover:text-white" onClick={resetGame}>Clear Game</li>
        </ul>
    </div>
  )
}

export default MenuButton