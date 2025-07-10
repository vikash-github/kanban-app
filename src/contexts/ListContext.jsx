// src/contexts/ThemeContext.jsx
import React, { createContext, useState } from 'react';
import {initialLists} from '../data/taskData';



export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState(initialLists); 

  return (
    <ListContext.Provider value={{ lists, setLists }}>
      {children}
    </ListContext.Provider>
  );
};