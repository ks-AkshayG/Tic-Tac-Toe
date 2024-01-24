import React from 'react'

type scoreProps = {
  character: string
  value: number
}

const Score = ({character, value}: scoreProps) => {
  return (
    <div>
        <div className='text-center text-[90px]'> {character} <span className='text-[30px] underline'>{value}</span></div>
    </div>
  )
}

export default Score