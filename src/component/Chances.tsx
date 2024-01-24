type chancesProps = {
    value: {
        id: number
        value: string
    }[]
}

const Chances = ({value}: chancesProps) => {

    let chances = value

    // console.log(value, ' From Chances Component')

  return (
    <div className='text-[50px]'>
        {
            chances.map((chance) => <div key={chance.id}>{chance.value}</div>)
        }
    </div>
  )
}

export default Chances