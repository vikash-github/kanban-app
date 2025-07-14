import React from 'react';
import addIcon from '/add.svg'

/**
 * AddButton Component
 * This component renders a button with an "Add" icon.
 * It is a reusable component that triggers a callback function when clicked.
 * 
 * @param {function} handleClick - Callback function to handle the click event.
 * @param {string} type - The type of item being added (e.g., "list" or "task").
 */
export default function AddButton({handleClick, type}) {
  return (
    <div className='flex m-1 cursor-pointer' onClick={handleClick}>
      <div className='w-4'>
        <img src={addIcon} alt={`Add ${type}`} title={`Add ${type}`} />
      </div> 
    </div>
  )
}
