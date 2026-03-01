import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'

import { Navigate, Route, Routes } from 'react-router'
import ProblemPage from './pages/ProblemPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import { Toaster } from 'react-hot-toast'

function App() {

  const { isSignedIn } = useUser()

  return (
    <>
    
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/problems' element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />

    </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>

  )
}

export default App
