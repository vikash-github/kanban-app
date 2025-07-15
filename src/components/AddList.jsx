import {useState, useContext} from 'react';
import AddButton from './UI/AddButton';
import { ListContext } from '../contexts/ListContext';
import InlineForm from './InlineForm';
import {ACTIONS} from '../data/constants';

/**
 * AddList Component
 * This component provides functionality to add a new list.
 * It renders an "Add" button and an inline form for entering the new list's title.
 * The component interacts with the global state via ListContext.
 */

export default function AddList() {
  const { dispatch } = useContext(ListContext);
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => {
      setShowForm(true);   
  }
  const onClose = () => {
    setShowForm(false);
  }
  
  /**
   * Handles the submission of the inline form.
   * Creates a new list object and dispatches an action to add it to the global state.
   * 
   * @param {Object} formData - The form data containing the title of the new list.
   */
  const handleSubmit = (formData) => {
    const newList = {
      id: Math.floor(Math.random() * 10000),
      title: formData.title,
      tasks: [],
    };
    dispatch({ type: ACTIONS.ADD_LIST, list: newList });
    onClose();
  }
  return (
    <div className='w-full sm:w-80 flex-col p-4 gap-3'>
      <AddButton type='List' handleClick={handleClick} />
      <InlineForm showForm={showForm} onSubmit={handleSubmit} onClose={onClose} />
    </div>
  )
}
