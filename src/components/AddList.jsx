import {useState, useContext} from 'react';
import AddButton from './AddButton';
import { ListContext } from '../contexts/ListContext';
export default function AddList() {
  const { dispatch } = useContext(ListContext);
  const [showForm, setShowForm] = useState(false);
  const className = showForm ? 'block' : 'hidden';
  const [formData, setFormData] = useState({});
  const handleClick = () => {
      setShowForm(true);
      
  }
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <div className={className}>
            <form >
                <input name="title" type="text" onChange={handleOnchange} placeholder="List Title" className="border p-2 rounded w-full mb-4" />
                <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>Save List</button>
            </form>
        </div>
    </div>
  )
}
