import React from 'react'
/*
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
*/
const activity = ({text}) => {
  return (
    <div className='task'>
      <div className='main'>
        <div className='text'>{text}</div>
      </div>  
    </div>
  )
}

export default activity