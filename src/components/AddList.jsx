import {useState, useContext} from 'react';
import AddButton from './AddButton';
import { ListContext } from '../contexts/ListContext';
import InlineForm from './InlineForm';

export default function AddList() {
  const { dispatch } = useContext(ListContext);
  const [showForm, setShowForm] = useState(false);
  const className = showForm ? 'block' : 'hidden';
  const [formData, setFormData] = useState({});
  const handleClick = () => {
      setShowForm(true);   
  }
  const onClose = () => {
    setShowForm(false);
    setFormData({});
  }
  
  const handleSubmit = (formData) => {
    const newList = {
      id: Math.floor(Math.random() * 10000),
      title: formData.title,
      tasks: [],
    };
    dispatch({ type: 'ADD_LIST', list: newList });
  }
  return (
    <div className='w-full sm:w-80 flex-col p-4 gap-3'>
        <AddButton type='List' handleClick={handleClick} />
        <InlineForm showForm={showForm} onSubmit={handleSubmit} onClose={onClose} />
    </div>
  )
}
