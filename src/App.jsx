import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeftSidebar from './components/leftSidebar'
import { toolboxItems } from '../formElement'
function App() {
  return(
    <>
     <LeftSidebar toolboxItems={toolboxItems}/>
    </>
  )

}

export default App
