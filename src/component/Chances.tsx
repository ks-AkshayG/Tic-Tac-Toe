import { useChancesContext } from "./Context/ChachesContext"

const Chances = () => {

    const value = useChancesContext()

    // console.log(value, ' From Chances Component')

  return (
    <div className='text-[50px]'>
        {
            value.map((chance) => <div key={chance.id}>{chance.value}</div>)
        }
    </div>
  )
}

export default Chances