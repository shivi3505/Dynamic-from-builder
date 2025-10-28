import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeftSidebar from './components/leftSidebar'
import { toolboxItems } from '../utills/formElement';
import Canvas from './components/canvas'
import FormPreview from './components/formPreview'

function App() {
  const [fields,setFields]= useState([]);

  return(
    <>
      <div className='flex h-full'>
           <LeftSidebar toolboxItems={toolboxItems}/>
           <Canvas displayDelete={true}/>
           
      </div>
   
    </>
  )

}

export default App
