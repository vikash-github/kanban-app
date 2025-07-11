import {useContext, useState} from 'react';
import { createPortal } from 'react-dom';
import { ListContext } from '../contexts/ListContext';
import Modal from './Modal';
import EditTaskForm from './EditTaskForm';
import AddButton from './AddButton';

export default function AddTask({listId}) {
  const [showModal, setShowModal] = useState(false);
  const { dispatch} = useContext(ListContext);
  const handleClick = () => {
    setShowModal(true);
  }
  const onSubmit = (formData) => {
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      title: formData.title,
      description: formData.description,
    };
    
    dispatch({ type: 'ADD_TASK', listId: listId, task: newTask });
    setShowModal(false);
  }
    // Assuming setLists is available in context to update the state
    // setLists([...lists]); // Uncomment if setLists is defined in context
  

  return (
    <>
      <AddButton type='Task' handleClick= {handleClick} />
      <Modal show={showModal} onClose={() => {setShowModal(false)}} >
        <EditTaskForm listId={listId}  onSubmit={onSubmit} />
      </Modal>
    </>
  )
}
