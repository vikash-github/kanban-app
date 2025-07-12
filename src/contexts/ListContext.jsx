// src/contexts/ThemeContext.jsx
import React, { createContext, useReducer } from 'react';
import {initialLists, listOrder} from '../data/taskData';
import {searchObjInArray} from '../utils/utils';
import {ACTIONS} from '../data/constants';

export const ListContext = createContext();

const reducerFunc = (state, action) => {
  const newLists = JSON.parse(JSON.stringify(state));
  const [list, listIndex] = searchObjInArray(newLists, 'id', action.listId);
  const [task, taskIndex] = action.taskId ? searchObjInArray(list[0].tasks, 'id', action.taskId) : ['', ''];
  const currentList = list[0];
  if (!currentList || taskIndex === -1 || !action.type || !action.type) return state; // If the list doesn't exist, return the current state
  switch (action.type) {
    case ACTIONS.MOVE_TASK_UP:
      if (taskIndex === 0) return newLists; 
      else {
        const task = currentList.tasks[taskIndex];
        currentList.tasks.splice(taskIndex, 1); // Remove the task from its current position
        currentList.tasks.splice(taskIndex - 1 , 0, task); // Insert it at the next position
        return newLists;
      }
    case ACTIONS.DELETE_TASK:
      currentList.tasks = currentList.tasks.filter((task) => task.id !== action.taskId);
      
      return newLists;
    case ACTIONS.MOVE_TASK_DOWN:
      if (taskIndex === currentList.tasks.length - 1) return newLists; // Already at the bottom
      else {
        const task = currentList.tasks[taskIndex];
        currentList.tasks.splice(taskIndex, 1); // Remove the task from its current position
        currentList.tasks.splice(taskIndex + 1, 0, task); // Insert it at the next position
        //setLists(newLists);
        return newLists;
      }
    case ACTIONS.MOVE_TASK_NEXT_LIST:
      const nextListId = (listIndex + 1) % newLists.length;
      const nextList = newLists[nextListId];
      nextList.tasks.push(task[0]);
      currentList.tasks = currentList.tasks.filter((task) => task.id !== action.taskId);
      return newLists;
    case ACTIONS.MOVE_TASK_PREV_LIST:
      const prevListId = listIndex ? listIndex - 1 : newLists.length - 1;
      const prevList = newLists[prevListId];
      prevList.tasks.push(task[0]);
      currentList.tasks = currentList.tasks.filter((task) => task.id !== action.taskId);
      return newLists;
    case ACTIONS.ADD_LIST:
      newLists.push(action.list);
      return newLists;
    case ACTIONS.ADD_TASK:
      currentList.tasks.push(action.task);
      return newLists;
    case ACTIONS.UPDATE_TASK:
      currentList.tasks[taskIndex] = action.task;
      return newLists;
    case ACTIONS.UPDATE_LIST:
      currentList.title = action.list.title;
      return newLists;
    default:
      return state;
  }
}
export const ListProvider = ({ children }) => {
  const [lists, dispatch] = useReducer(reducerFunc, initialLists);
  return (
    <ListContext.Provider value={{ lists, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};