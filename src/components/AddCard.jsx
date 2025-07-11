import {useContext} from 'react';
import { createPortal } from 'react-dom';
import { ListContext } from '../contexts/ListContext';

export default function AddCard({listId}) {
  const {lists, dispatch} = useContext(ListContext);
  const handleClick = () => {
  const newTask = {
    id: Math.floor(Math.random() * 10000),
    title: 'New Task added',
    description: 'Description of the new task added from click',
    status: 'todo'
  };
    
    dispatch({ type: 'ADD_TASK', listId: listId, task: newTask });
    return createPortal(<div><h1>Portal</h1></div>, document.getElementById('modal-root'));
  }
    // Assuming setLists is available in context to update the state
    // setLists([...lists]); // Uncomment if setLists is defined in context
  

  return (
    <div className='flex m-1 cursor-pointer' onClick={handleClick}>
        <div className='w-4'><svg fill="#000000"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 455 455" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 455,242.5 "></polygon> </g></svg>
        </div> 
        <div className='ml-2'>Add a card</div>
    </div>
      
  )
}
