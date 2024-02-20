type ChancesProps = {
  chances: string[]
}

const Chances = ({chances}: ChancesProps) => {

    // const value = useChancesContext()

    // console.log(value, ' From Chances Component')

  return (
    <div className='text-[50px]'>
        {
            chances.map((chance, index) => <div key={index}>{chance}</div>)
        }
    </div>
  )
}

export default Chances