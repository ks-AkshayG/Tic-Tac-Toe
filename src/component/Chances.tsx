type ChancesProps = {
  character: "X" | "O"
  chances: number
}

const Chances = ({character, chances}: ChancesProps) => {

  const divs = new Array(chances).fill(character)

  return (
    <div className='text-[50px]'>
        {
            divs.map((chance, index) => <div key={index}>{chance}</div>)
        }
    </div>
  )
}

export default Chances
