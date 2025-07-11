import React from 'react';
import { useContext, useState } from 'react';
import { ListContext } from '../contexts/ListContext';

export default function EditTaskForm({task = {}, listId, onSubmit}) {
  const [formData, setFormData] = useState({
    title: task.title || '',
    description: task.description || '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (onSubmit) {
      onSubmit(formData); // Pass formData to the prop
    } else {
      console.warn('onSubmit prop is not defined');
    }
  };
  
  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <input name="title" onChange={handleChange} value={formData.title} type="text" placeholder="Task Title" className="border p-2 rounded w-full mb-4" />
            <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Task Description" className="border p-2 rounded w-full mb-4"></textarea>
            <button  className="bg-blue-500 text-white p-2 rounded" >Save Task</button>
        </form>
    </div>
  )
}
