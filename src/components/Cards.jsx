import React from 'react'
import { useContext, useState } from 'react';
import { ListContext } from '../contexts/ListContext';
import EditTaskForm from './EditTaskForm';
import Modal from './Modal';
import deleteIcon from '/delete.svg';
import editIcon from '/edit.svg';
import leftIcon from '/left.svg';
import rightIcon from '/right.svg';
import upIcon from '/up.svg';
import downIcon from '/down.svg';






export default function Cards({tasks, listId}) {
const [editNDeleteState, setEditNDeleteState] = useState({showModal: false, task: {}, type: ''});
const { lists, dispatch } = useContext(ListContext);
const {showModal, task, type} = editNDeleteState;

const deleteTask = (e, task) => {
  dispatch({taskId: task.id, listId:listId, type: 'DELETE_TASK'});
  setEditNDeleteState({showModal: false, task: {}, type: ''});
}
const handleEditnDelete = (e, task, type) => {
  e.stopPropagation();
  setEditNDeleteState({showModal: true, task: task, type: type});

}
const onSubmit = (formData) => {
  const updatedTask = {
    id: task.id,
    title: formData.title,
    description: formData.description
  };
    
  dispatch({ type: 'UPDATE_TASK', listId: listId, task: updatedTask, taskId: task.id });
  setEditNDeleteState({showModal: false, task: {}, type: ''});
}
  
  return (
    <>
      {tasks.map((task) => {
        return (
          <div key = {task.id} className=' bg-blue-100 shadow-md rounded-xl p-4'>
            <h2 className='font-semibold text-xl'>{task.title}</h2>
            <div className=' text-black-300 text-xs mb-7'>{task.description}</div>
            <div className='flex gap-6 justify-around'>
              <div className='w-5 cursor-pointer' onClick={(e) => { handleEditnDelete(e, task, 'edit')}}><img src={editIcon} /></div>
              <div className='w-5 cursor-pointer' onClick={(e) => handleEditnDelete(e, task, 'delete') }><img src={deleteIcon} /></div>
              <div className='w-5 cursor-pointer'  onClick={() => dispatch({taskId: task.id, listId:listId, type: 'MOVE_TASK_UP'})} ><img src={upIcon} /></div>
              <div className='w-5 cursor-pointer'  onClick={() => dispatch({taskId: task.id, listId:listId, type: 'MOVE_TASK_DOWN'})}><img src={downIcon} /></div>
              <div className='w-5 cursor-pointer' onClick={() => dispatch({taskId: task.id, listId:listId, type: 'MOVE_TASK_PREV_LIST'})}><img src={leftIcon} /></div>
              <div className='w-5 cursor-pointer' onClick={() => dispatch({taskId: task.id, listId:listId, type: 'MOVE_TASK_NEXT_LIST'})}><img src={rightIcon} /></div>
          </div>
        </div>
        )
      })}
      <Modal show={showModal} onClose={() => {setEditNDeleteState({showModal: false, task: {}, type: ''});
}} >
        {task && type === 'edit' ? <EditTaskForm listId={listId} task={task} onSubmit={onSubmit} /> :
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Are you sure you want to delete this task?</h2>
          <button className='bg-red-500 text-white p-2 rounded' onClick={(e) => deleteTask(e, task)}>Delete Task</button>
        </div>}
      </Modal>
    </>
  )
}
  
