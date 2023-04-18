import React from 'react'
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"

const activity = ({text, updateMode, deleteActivity}) => {
  return (
    <div className='task'>
      <div className='main'>
        <div className='text'>{text}</div>
        <div className='icons'>
          <BiEdit className='icon' onClick={updateMode} />
          <AiFillDelete className='icon' onClick={deleteActivity} />
        </div>
      </div>  
    </div>
  )
}

export default activity