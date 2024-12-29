import { useState } from 'react'

import './App.css'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import AddFeedback from './components/AddFeedback'
import Main from './components/Main'

// import AddFeedback from './components/AddFeedback'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <AddFeedback/> */}

      <Routes>
      <Route path='/dash' element={<Main child={<Dashboard/>}/>}></Route>
      <Route path='/' element={<Main child={<AddFeedback/>}/>}></Route>

      </Routes>
     
      
    </>
  )
}

export default App
