import {useState} from 'react';

/**
 * InlineForm Component
 * This component renders an inline form for editing or creating a list title.
 * It accepts props to control its visibility, handle form submission, and manage form data.
 * 
 * @param {boolean} showForm - Determines whether the form should be displayed.
 * @param {function} onSubmit - Callback function to handle form submission.
 * @param {string} title - The initial title value for the form.
 * @param {string} listId - The ID of the list being edited (if applicable).
 * @param {function} onClose - Callback function to handle form closure.
 */

export default function InlineForm({ showForm, onSubmit, title, listId, onClose}) {
  const [formData, setFormData] = useState( { title: title || '', id: listId || '' });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  /**
   * Handles form submission.
   * Prevents the default form submission 
   * calls the onSubmit callback with formData.
   * 
   * @param {Object} e - default event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (listId) {
      formData.id = listId;
    }
    if (onSubmit) {
      onSubmit(formData); // Pass formData to the prop
    } else {
      console.warn('onSubmit prop is not defined');
    }
  }
  if (!showForm) {
    return null; // Don't render anything if showForm is false
  }

  return (
    <div className=''>
      <form >
          <input name="title" type="text" onChange={handleOnchange} value={formData.title} placeholder="List Title" className="border p-2 rounded w-full mb-4" />
          <div className='flex gap-2'>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>Save</button>
            <div className='text-gray-500 text-sm cursor-pointer' onClick={onClose}>Close</div>
          </div>
      </form>
  </div>
  )
}
