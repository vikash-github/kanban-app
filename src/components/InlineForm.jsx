import {useState} from 'react'

export default function InlineForm({ showForm, onSubmit, title, listId, onClose}) {
  const [formData, setFormData] = useState( { title: title || '', id: listId || '' });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
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
    <div>
      
        <div>
            <form >
                <input name="title" type="text" onChange={handleOnchange} value={formData.title} placeholder="List Title" className="border p-2 rounded w-full mb-4" />
                <div className='flex gap-2'>
                  <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>Save</button>
                  <div className='text-gray-500 text-sm cursor-pointer' onClick={onClose}>Close</div>
                </div>
            </form>
        </div>
    </div>
  )
}
