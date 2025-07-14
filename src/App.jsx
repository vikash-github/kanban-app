import {createContext, useState} from 'react';
import { ListProvider } from './contexts/ListContext';
import Lists from './components/Lists';
import './App.css'
import Header from './components/UI/Header';

function App() {


  return (
    <ListProvider>
      <Header />
      <div className="min-h-screen p-8 font-inter text-black mt-2">
        <Lists />
      </div>
    </ListProvider>
  )
}

export default App
