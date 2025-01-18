import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MessageViewer from './pages/MessageViewer'
import { Toaster } from 'sonner'

const App: React.FC = () => {
  return (
    <>
      <Toaster />
        <Router>
          <Routes>
            <Route path='/' element={<MessageViewer />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
