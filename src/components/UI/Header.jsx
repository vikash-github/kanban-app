import React from 'react'
import logo from '/logocopy.svg'

export default function Header() {
  return (
    <div className='w-full flex  mb-5w-full  flex-row h-20 shadow-xl  bg-blue-100 justify-between items-center px-4'>
        <div className='icon w-12 '>
          <img src={logo} title='logo'/>
        </div>
        <div className='title text-2xl font-bold'>Kanban App</div>
        <div className='flex justify-end gap-3 p-3'>
            <div className='account cursor-pointer'> account</div>
            <div className='links cursor-pointer'> link</div>
        </div>
    </div>
  )
}