import { Fragment, useState } from 'react'

import './App.css'
import SideNavBar from './components/navigation/SideNavBar'
import MainContent from './components/navigation/MainContent'

function App() {
  

  return (
    <div style={{display:'flex'}}>
      <SideNavBar />
      <MainContent />
    </div>
  )
}

export default App
