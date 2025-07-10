import React from 'react'
import Cards from './Cards'
import AddCard from './AddCard'
import { useContext } from 'react';
import { ListContext } from '../contexts/ListContext';

export default function Lists() {
  const { lists, setLists } = useContext(ListContext);
  return (
    <>
      <div className='flex flex-wrap gap-6 justify-center items-start'>
      {lists.map((list, index) => {
        return (<div key = {list.id} className='bg-gray-100 w-full sm:w-80 rounded-xl shadow-xl p-4 flex flex-col gap-3  '>
          <h2 className='font-semibold text-2xl'>{list.title}</h2>
          <Cards tasks={list.tasks} listId={list.id} />
          <AddCard  />
        </div>)
      })}
      </div>  
    </>
  )
}

