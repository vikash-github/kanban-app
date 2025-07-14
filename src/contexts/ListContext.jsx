import React, { createContext, useReducer } from 'react';
import {searchObjInArray} from '../utils/utils';
import {ACTIONS, INITIAL_LIST} from '../data/constants';

export const ListContext = createContext();

/**
 * Reducer function to handle state updates for lists and tasks.
 * @param {Array} state - The current state of the lists.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Array} - The updated state.
 */

const reducerFunc = (state, action) => {

  //validation for action and action type
  if (!action || !action.type) return state;
  if (action.type === ACTIONS.ADD_LIST && !action.list) return state; 
  if (action.type === ACTIONS.ADD_TASK && (!action.listId || !action.task)) return state;
  if (action.type === ACTIONS.UPDATE_TASK && (!action.listId || !action.task || !action.taskId)) return state;
  if (action.type === ACTIONS.UPDATE_LIST_TITLE && (!action.list || !action.listId)) return state;
  if (action.type === ACTIONS.MOVE_TASK_UP && (!action.listId || !action.taskId)) return state;
  if (action.type === ACTIONS.MOVE_TASK_DOWN && (!action.listId || !action.taskId)) return state;
  if (action.type === ACTIONS.MOVE_TASK_NEXT_LIST && (!action.listId || !action.taskId)) return state;
  if (action.type === ACTIONS.DELETE_TASK && (!action.listId || !action.taskId)) return state;
  if (action.type === ACTIONS.MOVE_TASK_PREV_LIST && (!action.listId || !action.taskId)) return state;

//Extracting list and task based on action
  const [list, listIndex] = action.listId ? searchObjInArray(state, 'id', action.listId) : ['', -1];
  const [task, taskIndex] = action.taskId ? searchObjInArray(list[0].tasks, 'id', action.taskId) : ['', ''];
  const currentList = list[0];

  //if new list is there then other validations not required
  if (action.type !== ACTIONS.ADD_LIST ) {
    if (!currentList || taskIndex === -1 || !action.type) return state; // If the list doesn't exist, return the current state
  } 
  
  switch (action.type) {
    case ACTIONS.MOVE_TASK_UP:
      if (taskIndex === 0) return state;
      const tasksUp = [...currentList.tasks]; // Create a new array of tasks
      const [movedTaskUp] = tasksUp.splice(taskIndex, 1);
      tasksUp.splice(taskIndex - 1, 0, movedTaskUp);
      return state.map((list) =>
        list.id === action.listId ? { ...list, tasks: tasksUp } : list
      );
    case ACTIONS.DELETE_TASK:
        return state.map((list) => 
          list.id === action.listId
          ? { ...list, tasks: list.tasks.filter((task) =>  task.id !== action.taskId) }
          : list
        );
        
    case ACTIONS.MOVE_TASK_DOWN:
      if (taskIndex === currentList.tasks.length - 1) return state; // Already at the bottom
      const tasksDown = [...currentList.tasks];
      const [movedTaskDown] =  tasksDown.splice(taskIndex, 1); // Remove the task from its current position
      tasksDown.splice(taskIndex + 1, 0, movedTaskDown); // Insert it at the next position
       
        return state.map((list) =>
          list.id === action.listId ? { ...list, tasks: tasksDown } : list
        );
    case ACTIONS.MOVE_TASK_NEXT_LIST:
      const nextListId =  listIndex !== state.length - 1 ? listIndex + 1 : 0 ;
      if (nextListId < 0 || nextListId >= state.length) {
        return state; 
      }
      const updatedNextList = {
        ...state[nextListId],
        tasks: [...state[nextListId].tasks, task[0]], 
      };
      const postUpdatedCurrentList = {
        ...currentList,
        tasks: currentList.tasks.filter((task) => task.id !== action.taskId), 
      };
      return state.map((list, index) =>
        index === nextListId
          ? updatedNextList
          : index === listIndex
          ? postUpdatedCurrentList
          : list
      );
    case ACTIONS.MOVE_TASK_PREV_LIST:
      const prevListId = listIndex ? listIndex - 1 : state.length - 1;
      if (prevListId < 0 || prevListId >= state.length) {
        return state; 
      }
      const updatedPrevList = {
        ...state[prevListId],
        tasks: [...state[prevListId].tasks, task[0]], 
      };
      const updatedCurrentList = {
        ...currentList,
        tasks: currentList.tasks.filter((task) => task.id !== action.taskId), 
      };

      return state.map((list, index) =>
        index === prevListId
          ? updatedPrevList
          : index === listIndex
          ? updatedCurrentList
          : list
      );
    case ACTIONS.ADD_LIST:
      return [
        ...state,
        {
          id: action.list.id,
          title: action.list.title,
          tasks: [],
        },
      ];
    case ACTIONS.ADD_TASK:
      return state.map((list) => (
        list.id === action.listId ? { ...list, tasks: [...list.tasks, action.task] } : list
      )); 
    case ACTIONS.UPDATE_TASK:
      return state.map((list) =>
        list.id === action.listId
          ? {
              ...list,
              tasks: list.tasks.map((task, index) =>
                index === taskIndex ? { ...task, ...action.task } : task
              ),
            }
          : list
      );
    case ACTIONS.UPDATE_LIST_TITLE:
      return state.map((list) =>
        list.id === action.listId
          ? { ...list, title: action.list.title }
          : list
      );
      
    default:
      return state;
  }
}
export const ListProvider = ({ children }) => {
  const [lists, dispatch] = useReducer(reducerFunc, INITIAL_LIST);
  return (
    <ListContext.Provider value={{ lists, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};