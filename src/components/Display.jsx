import React from 'react'

const Display = ({ expression, result }) => {
  return (
    <div className='Result'>
        <p className="expression">{expression}</p>
        <p className="result">{result}</p>
    </div>
  )
}

export default Display