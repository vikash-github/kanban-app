import {createContext, useState} from 'react';
import { ListProvider } from './contexts/ListContext';
import Lists from './components/Lists';
import './App.css'

function App() {


  return (
    <ListProvider>
      <div className='min-h-screen p-8 font-inter text-black'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Kanban App</h1>
        <Lists />
      </div>
    </ListProvider>
  )
}

export default App
