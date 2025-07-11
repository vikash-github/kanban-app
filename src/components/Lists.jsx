import React from 'react'
import Cards from './Cards'
import AddTask from './AddTask'
import { useContext, useState } from 'react';
import { ListContext } from '../contexts/ListContext';
import AddList from './AddList';
import InlineForm from './InlineForm';

export default function Lists() {
  const { lists, dispatch } = useContext(ListContext);
  const [listIdToUpdate, setlistIdToUpdate] = useState(false);
  const handleSubmit = (formData) => {
    const newList = {
      id: formData.id,
      title: formData.title
    };
    dispatch({ type: 'UPDATE_LIST', list: newList, listId: formData.id });
    setlistIdToUpdate(false);
  }
  const handleClick = (id) => {
    setlistIdToUpdate(id);
  }
  return (
    <>
      <div className='flex flex-wrap gap-6 justify-center items-start'>
        {lists.map((list, index) => {
          return (<div key = {list.id} className='bg-gray-100 w-full sm:w-80 rounded-xl shadow-xl p-4 flex flex-col gap-3  '>
            { listIdToUpdate !== list.id && <h2 className='font-semibold text-2xl' onClick={() => {handleClick(list.id)}}>{list.title}</h2>}
            {listIdToUpdate === list.id && <InlineForm showForm={true} onSubmit={handleSubmit} title={list.title} listId={list.id} onClose={()=>{setlistIdToUpdate(false)}} />}
            <Cards tasks={list.tasks} listId={list.id} />
            <AddTask listId={list.id} />
          </div>)
        })}
        <AddList  />
      </div>  
    </>
  )
}

