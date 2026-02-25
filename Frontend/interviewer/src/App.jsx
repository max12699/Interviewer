import { useState } from 'react'
import './App.css'
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
    
    <h1>Welcome to the App </h1>

    <SignedOut>
      <SignInButton mode="modal" />
    </SignedOut>

    <SignedIn>
      <SignOutButton/>
    </SignedIn>

    <UserButton/>

    </>
  )
}

export default App
