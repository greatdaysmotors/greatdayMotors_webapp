import React from 'react'
import "./addButton.scss"



const AddButton = ({fn,icon,margin_right,title}) => {
  return (
    <div className='add-button-container'
    style={{
        marginRight:margin_right,
    }}
    onClick={fn}
    >
<div className='abc-sub-c'>
<img src={icon} alt="..."/>
      <div className='add-text'>{title}</div>
</div>
    </div>
  )
}

export default AddButton
