import React from 'react'
import Cards from './Cards'
import AddTask from './AddTask'
import { useContext, useState } from 'react';
import { ListContext } from '../contexts/ListContext';
import AddList from './AddList';
import InlineForm from './InlineForm';
import { FEATURE_FLAGS, ACTIONS } from '../data/constants'; 

/**
 * Lists Component
 * This component renders a list of task lists and provides functionality to edit list titles(feature flag dependent)
 * and add new lists(feature flag dependent). It uses the ListContext for state management.
 */

export default function Lists() {
  const { lists, dispatch } = useContext(ListContext);
  const [listIdToUpdate, setlistIdToUpdate] = useState(false);

  /**
   * Handles the submission of the updated list title.
   * Dispatches an action to update the list title in the global state.
   * @param {Object} formData - The form data containing the list ID and updated title.
   */
  const handleTitleSubmit = (formData) => {
    const updatedList = {
      id: formData.id,
      title: formData.title
    };
    dispatch({ type: ACTIONS.UPDATE_LIST_TITLE, list: updatedList, listId: formData.id });
    // Reset the listIdToUpdate state to close the InlineForm
    setlistIdToUpdate(null);
  }
  /**
   * Handles the click event on a list title.
   * Check if the feature flag for list editing is enabled
   */
  const handleTitleClick = (id) => {
    
    if (!FEATURE_FLAGS.ENABLE_LIST_EDIT) return;
    setlistIdToUpdate(id);
  }
  //error handling for empty lists
  if (!lists || lists.length === 0) {
    return <div className='flex justify-center text-2xl text-red-400'>No lists available.</div>;
  }
  return (
    <>
      <div className='flex flex-wrap gap-6 justify-center items-start'>
        {lists.map((list, index) => {
          return (
              <div key = {list.id} className='bg-green-100 w-full sm:w-80 rounded-xl shadow-xl p-2 flex flex-col gap-3 list '>
                <div className='flex justify-between'>
                  { listIdToUpdate !== list.id && <h2 className='font-semibold text-xl' onClick={() => {handleTitleClick(list.id)}}>{list.title}</h2>}
                  <AddTask listId={list.id} />
                </div>
                {/** Render InlineForm only if listIdToUpdate matches the current list's id(featute flag dependent) */}
                {listIdToUpdate === list.id && <InlineForm showForm={true} onSubmit={handleTitleSubmit} title={list.title} listId={list.id} onClose={()=>{setlistIdToUpdate(false)}} />}
                <Cards tasks={list.tasks} listId={list.id} />
              </div>
          )
        })}
        {/** based on feature flag render AddList component */}
        {FEATURE_FLAGS.ENABLE_LIST_ADD && <AddList />}  
      </div>  
    </>
  )
}

