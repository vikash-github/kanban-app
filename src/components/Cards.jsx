import React from 'react'
import { useContext, useReducer } from 'react';
import { ListContext } from '../contexts/ListContext';
import { listOrder } from '../data/taskData';

export default function Cards({tasks, listId}) {
  const { lists, setLists } = useContext(ListContext);
  const [state, dispatch] = useReducer(reducer, lists);

  const moveTaskUp = (taskId, listId) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists.filter((list) => list.id === listId);
    const taskIndex = list[0].tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === 0) return; 
    else {
      const task = list[0].tasks[taskIndex];
      list[0].tasks.splice(taskIndex, 1); // Remove the task from its current position
      list[0].tasks.splice(taskIndex - 1 , 0, task); // Insert it at the next position
      setLists(newLists);
    }
  }

  const deleteTask = (taskId, listId) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    newLists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }
    });
    setLists(newLists);
  }

  const moveTaskDown = (taskId, listId) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const list = newLists.filter((list) => list.id === listId);
    const taskIndex = list[0].tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === list[0].tasks.length - 1) return; // Already at the bottom
    else {
      const task = list[0].tasks[taskIndex];
      list[0].tasks.splice(taskIndex, 1); // Remove the task from its current position
      list[0].tasks.splice(taskIndex + 1, 0, task); // Insert it at the next position
      setLists(newLists);
    }
  }
  
  const moveTaskToNextList =  (taskId,  listId) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const task = newLists.filter((list) => list.id === listId)[0].tasks.find((task) => task.id === taskId);
    const toListId = listOrder[(listOrder.indexOf(listId) + 1) % listOrder.length];
    newLists.map((list) => {
        if(list.id === toListId) {
          list.tasks.push(task);
        } else if (list.id === listId) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
        }
        });
    setLists(newLists);

  }
  const moveTaskToPrevList =  (taskId,  listId) => {
    const newLists = JSON.parse(JSON.stringify(lists));
    const task = newLists.filter((list) => list.id === listId)[0].tasks.find((task) => task.id === taskId);
    const toListId = listOrder.indexOf(listId) ? listOrder[(listOrder.indexOf(listId) - 1)% listOrder.length] : listOrder[listOrder.length -1];
    newLists.map((list) => {
        if(list.id === toListId) {
          list.tasks.push(task);
        } else if (list.id === listId) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
        }
        });
    setLists(newLists);

  }
  return (
    <>
      {tasks.map((task) => {
        return (
          <div key = {task.id} className=' bg-blue-100 shadow-md rounded-xl p-4'>
            <h2 className='font-semibold text-xl'>{task.title}</h2>
            <div contentEditable className=' text-black-300 text-xs mb-7'>{task.description}</div>
            <div className='flex gap-6 justify-around'>
              <div className='w-5'><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
              <div className='w-5' onClick={() => deleteTask(task.id, listId)} deleteTask><svg viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg></div>
              <div className='w-5'  onClick={() => moveTaskUp(task.id, listId)} ><svg fill="#000000" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82812,146.82812l-72,72a3.99853,3.99853,0,0,1-5.65625,0l-72-72a3.99957,3.99957,0,0,1,5.65625-5.65625L124,206.34277V40a4,4,0,0,1,8,0V206.34277l65.17187-65.1709a3.99957,3.99957,0,0,1,5.65625,5.65625Z"></path> </g></svg></div>
              <div className='w-5'  onClick={() => moveTaskDown(task.id, listId)}><svg fill="#000000" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82812,146.82812l-72,72a3.99853,3.99853,0,0,1-5.65625,0l-72-72a3.99957,3.99957,0,0,1,5.65625-5.65625L124,206.34277V40a4,4,0,0,1,8,0V206.34277l65.17187-65.1709a3.99957,3.99957,0,0,1,5.65625,5.65625Z"></path> </g></svg></div>
              <div className='w-5' onClick={() => moveTaskToPrevList(task.id, listId)}><svg fill="#000000" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82812,146.82812l-72,72a3.99853,3.99853,0,0,1-5.65625,0l-72-72a3.99957,3.99957,0,0,1,5.65625-5.65625L124,206.34277V40a4,4,0,0,1,8,0V206.34277l65.17187-65.1709a3.99957,3.99957,0,0,1,5.65625,5.65625Z"></path> </g></svg></div>
              <div className='w-5' onClick={() => moveTaskToNextList(task.id, listId)}><svg fill="#000000" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M202.82812,146.82812l-72,72a3.99853,3.99853,0,0,1-5.65625,0l-72-72a3.99957,3.99957,0,0,1,5.65625-5.65625L124,206.34277V40a4,4,0,0,1,8,0V206.34277l65.17187-65.1709a3.99957,3.99957,0,0,1,5.65625,5.65625Z"></path> </g></svg> </div>
          </div>
        </div>
        )
      })}
    </>
  )
}
  /** return (
    tasks.map((task) => {
      return(
      <div className=' bg-blue-100 shadow-md rounded-xl p-4'>
        <h2 className='font-semibold text-xl'>Task one</h2>
        <div contentEditable className=' text-black-300 text-xs mb-7'>Description of task one</div>
        <Actions />
    </div>)
    })}
  )
} */
