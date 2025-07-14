import React from 'react';
import { useContext, useState } from 'react';
import { ListContext } from '../contexts/ListContext';

/**
 * EditTaskForm Component
 * This component renders a form for editing a task's details (title and description).
 * It uses local state for form data and validation, and it interacts with the global state via ListContext.
 * 
 * @param {Object} task - The task object to be edited (default is an empty object).
 * @param {string} listId - The ID of the list to which the task belongs.
 * @param {function} onSubmit - Callback function to handle form submission.
 * @param {string} type - The type of operation (e.g., 'edit' or 'create').
 */

export default function EditTaskForm({task = {}, listId, onSubmit, type}) {
  const [validationError, setvalidationError] = useState({title: false});
  const [formData, setFormData] = useState({
    title: task.title || '',
    description: task.description || '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    //change state with updated value
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles form submission.
   * Validates the input and calls the onSubmit callback with the updated form data.
   * 
   * @param {Object} e - default event object
   */
  const handleFormSubmit = (e) => {

    e.preventDefault(); // Prevent default form submission
    const { title } = formData;

    if (!title.trim()) {//validate
      setvalidationError({title: true});
      return; // Prevent submission if title is empty
    }
    if (onSubmit) {
      onSubmit(formData); // Pass formData to the callback prop
    } else {
      console.warn('onSubmit prop is not defined');
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{ type === 'add' ? 'Add Task' : `Edit task - ${task.title}` }</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="h-1/3 mb-4">
          <input name="title" onChange={handleChange} value={formData.title} type="text" placeholder="Task Title" className="border p-2 rounded w-full mb-4" />
           <div className=' text-red-500 mb-2 '> {validationError.title && 'Title in mandatory'}</div>
        </div>
          <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Task Description" className="border p-2 rounded w-full mb-4"></textarea>
          <button  className="bg-blue-500 text-white p-2 rounded cursor-pointer" >Save Task</button>
      </form>
    </div>
  )
}
