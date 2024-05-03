import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#1d2125] w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fabdc29]'>
      <div className="left justify-center items-center flex">
        <h3>MyTrello</h3>
      </div>  
      <div className="right flex items-center space-x-4">
        <span>RemoteDev</span>
        <img className='rounded-full' src="https://placeholder.co/28x28/png" alt="" />
      </div>      
    </div>
  )
}

export default Header