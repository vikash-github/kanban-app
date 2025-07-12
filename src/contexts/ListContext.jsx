// src/contexts/ThemeContext.jsx
import React, { createContext, useReducer } from 'react';
import {initialLists, listOrder} from '../data/taskData';
import {searchObjInArray} from '../utils/utils'

export const ListContext = createContext();

const reducerFunc = (state, action) => {
  const newLists = JSON.parse(JSON.stringify(state));
  const [list, listIndex] = searchObjInArray(newLists, 'id', action.listId);
  const [task, taskIndex] = action.taskId ? searchObjInArray(list[0].tasks, 'id', action.taskId) : ['', ''];
  
  switch (action.type) {
    case 'MOVE_TASK_UP':
      if (taskIndex === 0) return newLists; 
      else {
        const task = list[0].tasks[taskIndex];
        list[0].tasks.splice(taskIndex, 1); // Remove the task from its current position
        list[0].tasks.splice(taskIndex - 1 , 0, task); // Insert it at the next position
        return newLists;
      }
    case 'DELETE_TASK':
      list[0].tasks = list[0].tasks.filter((task) => task.id !== action.taskId);
      
      return newLists;
    case 'MOVE_TASK_DOWN':
      if (taskIndex === list[0].tasks.length - 1) return newLists; // Already at the bottom
      else {
        const task = list[0].tasks[taskIndex];
        list[0].tasks.splice(taskIndex, 1); // Remove the task from its current position
        list[0].tasks.splice(taskIndex + 1, 0, task); // Insert it at the next position
        //setLists(newLists);
        return newLists;
      }
    case 'MOVE_TASK_NEXT_LIST':
      const nextListId = (listIndex + 1) % newLists.length;
      newLists[nextListId].tasks.push(task[0]);
      newLists[listIndex].tasks = newLists[listIndex].tasks.filter((task) => task.id !== action.taskId);
      return newLists;
    case 'MOVE_TASK_PREV_LIST':
      const prevListId = listIndex ? listIndex - 1 : newLists.length - 1;
      newLists[prevListId].tasks.push(task[0]);
      newLists[listIndex].tasks = newLists[listIndex].tasks.filter((task) => task.id !== action.taskId);
      return newLists;
    case 'ADD_LIST':
      newLists.push(action.list);
      return newLists;
    case 'ADD_TASK':
      list[0].tasks.push(action.task);
       
      return newLists;
    case 'UPDATE_TASK':
      list[0].tasks[taskIndex] = action.task;
      return newLists;
      case 'UPDATE_LIST':
        list[0].title = action.list.title;
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