import React from 'react'

const Card = ({message}: any) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-10 bg-gray-700 text-white">
        I got message prop: { message }
    </div>
  )
}

export default Card