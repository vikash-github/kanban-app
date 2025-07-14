import React from 'react'
import { useContext, useState } from 'react';
import { ListContext } from '../contexts/ListContext';
import EditTaskForm from './EditTaskForm';
import Modal from './UI/Modal';
import deleteIcon from '/delete.svg';
import editIcon from '/edit.svg';
import leftIcon from '/left.svg';
import rightIcon from '/right.svg';
import upIcon from '/up.svg';
import downIcon from '/down.svg';
import doneIcon  from '/done.svg';
import descIcon  from '/description.svg';
import emptyCircle from '/emptycircle.svg';
import {ACTIONS} from '../data/constants';

/**
 * Cards Component
 * Renders a list of task cards for a specific list.
 * It provides functionality to edit, delete, and move tasks, and complete or incomplete.
 * 
 * @param {Array} tasks - The array of tasks to be displayed.
 * @param {string} listId - The ID of the list to which the tasks belong.
 */

export default function Cards({tasks, listId}) {
const [editNDeleteState, setEditNDeleteState] = useState({showModal: false, task: {}, type: ''});
const [isComplete, setIsComplete] = useState(false);
const {  dispatch } = useContext(ListContext);
const {showModal, task, type} = editNDeleteState;

const deleteTask = (e, task) => {
  dispatch({taskId: task.id, listId:listId, type: ACTIONS.DELETE_TASK});
  setEditNDeleteState({showModal: false, task: {}, type: ''});
}
/**
   * Handles the edit or delete action for a task.
   * Opens the modal and sets the state with the task details and action type.
   * 
   * @param {Object} e - The event object from the click.
   * @param {Object} task - The task object to be edited or deleted.
   * @param {string} type - The type of action ('edit' or 'delete').
   */
const handleEditnDelete = (e, task, type) => {
  e.stopPropagation();

  setEditNDeleteState({showModal: true, task, type});
}

/**
   * Handles marking a task as complete or incomplete.
   * Toggles the `isComplete` state and dispatches an action to update the task.
   * 
   * @param {Object} task - The task object to be updated.
   */
const handleToggleComplete = (task) => {
  if (!task.id || !listId) {
    console.warn('Invalid taskId or listId');
    return;
  }
  dispatch({ type: ACTIONS.UPDATE_TASK, listId: listId, task: {...task, complete: !isComplete}, taskId: task.id });
  setIsComplete(!isComplete);
}

/**
 * Handles the form submission for editing a task.
 * 
 * @param {Object} formData 
 */

const onSubmit = (formData) => {
  const updatedTask = {
    id: task.id,
    title: formData.title,
    description: formData.description
  };
  dispatch({ type: ACTIONS.UPDATE_TASK, listId: listId, task: updatedTask, taskId: task.id });
  // Reset the modal state after submission
  setEditNDeleteState({showModal: false, task: {}, type: ''});
}
  if (!tasks || !listId) {
    return null; // Return null if task is not defined or has no id
  }

  const handleMoveTask = (task, listId, actionType) => {
    if (!task || !listId || !actionType) {
      console.warn('Invalid task or listId');
      return;
    }
    dispatch({taskId: task.id, listId:listId, type: actionType});
  }

  /**
   * 
   * @param {Object} task 
   * @returns component with task actions
   */
  const renderTaskActions = (task) => {
    return (
      <>
        <div className='w-5 cursor-pointer' onClick={(e) => { handleEditnDelete(e, task, 'edit')}}><img src={editIcon} title='Edit task' /></div>
        <div className='w-5 cursor-pointer' onClick={(e) => handleEditnDelete(e, task, 'delete') }><img src={deleteIcon} title='Delete task'/></div>
        <div className='w-5  cursor-pointer'  onClick={() => handleMoveTask( task, listId,  ACTIONS.MOVE_TASK_UP)} ><img src={upIcon} title='Move task Up'/></div>
        <div className='w-5 cursor-pointer'  onClick={() => handleMoveTask( task, listId,  ACTIONS.MOVE_TASK_DOWN)}><img src={downIcon} title='Move task Down' /></div>
        <div className='w-5 cursor-pointer' onClick={() => handleMoveTask( task, listId,  ACTIONS.MOVE_TASK_PREV_LIST)}><img src={leftIcon} title='Move task to previous list'/></div>
        <div className='w-5 cursor-pointer' onClick={() => handleMoveTask( task, listId,  ACTIONS.MOVE_TASK_NEXT_LIST)}><img src={rightIcon} title='Move task to next list' /></div>
      </>
    )
  }
  return (
    <>
      {tasks.map((task) => {
        return (
          <div key = {task.id} className=' bg-red-100 shadow-md rounded-xl p-2'>
            <div className='flex items-center gap-2'>
              <div className='w-5 cursor-pointer' onClick={() => handleToggleComplete(task)}>
                {task.complete ? <img src={doneIcon} alt='task' className='w-12 h-12 rounded-full mr-4' /> :
                 <img src={emptyCircle} alt='task' className='w-12 h-12 rounded-full mr-4' /> }
              </div>
              <div className='text-sm cursor-pointer' onClick={(e) => { handleEditnDelete(e, task, 'edit')}}>{task.title}</div>
            </div>
            <div className='w-5 mb-2'>{task.description && <img src={descIcon} alt="task description"  title='This task has description'/>}</div>
            <div className='flex gap-6 justify-around'>
              {renderTaskActions(task)}
          </div>
        </div>
        )
      })}
      <Modal show={showModal} onClose={()=>{setEditNDeleteState({showModal: false, task: {}, type: ''});
}} >
        {task && type === 'edit' ? <EditTaskForm listId={listId} task={task} onSubmit={onSubmit} /> :
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Are you sure you want to delete - {`${task.title}`}  ?</h2>
          <button className='bg-red-500 text-white p-2 rounded cursor-pointer' onClick={(e) => deleteTask(e, task)}>Delete Task</button>
        </div>}
      </Modal>
    </>
  )
}
  
