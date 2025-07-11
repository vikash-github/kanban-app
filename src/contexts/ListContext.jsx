// src/contexts/ThemeContext.jsx
import React, { createContext, useReducer } from 'react';
import {initialLists, listOrder} from '../data/taskData';

export const ListContext = createContext();

const reducerFunc = (state, action) => {
  const newLists = JSON.parse(JSON.stringify(state));
  const list = newLists.filter((list) => list.id === action.listId);
  const listIndex = newLists.findIndex((list) => list.id === action.listId);
  const task = action.taskId ? list[0].tasks.find((task) => task.id === action.taskId) : '';
  const taskIndex = action.taskId ? list[0].tasks.findIndex((task) => task.id === action.taskId) : '';
  switch (action.type) {
    case 'MOVE_TASK_UP':
      if (taskIndex === 0) return; 
      else {
        const task = list[0].tasks[taskIndex];
        list[0].tasks.splice(taskIndex, 1); // Remove the task from its current position
        list[0].tasks.splice(taskIndex - 1 , 0, task); // Insert it at the next position
        //setLists(newLists);
        return newLists;
      }
    case 'DELETE_TASK':
      newLists.map((list) => {
        if (list.id === action.listId) {
          list.tasks = list.tasks.filter((task) => task.id !== action.taskId);
        }
      });
      return newLists;
    case 'MOVE_TASK_DOWN':
      if (taskIndex === list[0].tasks.length - 1) return; // Already at the bottom
      else {
        const task = list[0].tasks[taskIndex];
        list[0].tasks.splice(taskIndex, 1); // Remove the task from its current position
        list[0].tasks.splice(taskIndex + 1, 0, task); // Insert it at the next position
        //setLists(newLists);
        return newLists;
      }
    case 'MOVE_TASK_NEXT_LIST':
      const nextListId = listOrder[(listOrder.indexOf(action.listId) + 1) % listOrder.length];
      newLists.map((list) => {
        if(list.id === nextListId) {
          list.tasks.push(task);
        } else if (list.id === action.listId) {
          list.tasks = list.tasks.filter((task) => task.id !== action.taskId);
        }
      });
      return newLists;
    case 'MOVE_TASK_PREV_LIST':
      const prevListId = listOrder.indexOf(action.listId) ? listOrder[(listOrder.indexOf(action.listId) - 1)% listOrder.length] : listOrder[listOrder.length -1];
      newLists.map((list) => {
        if(list.id === prevListId) {
          list.tasks.push(task);
        } else if (list.id === action.listId) {
          list.tasks = list.tasks.filter((task) => task.id !== action.taskId);
        }
      });
      return newLists;
    case 'ADD_LIST':
      newLists.push(action.list);
      return newLists;
    case 'ADD_TASK':
      newLists.map((list) => {
        if(list.id === action.listId) {
          list.tasks.push(action.task);
        }
      });
      return newLists;
    case 'UPDATE_TASK':
      const index = list[0].tasks.findIndex((task) => task.id === action.taskId) ;
      list[0].tasks[index] = action.task;
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