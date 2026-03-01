import {} from 'react'
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios'


function HomePage() {

  return (
    <div>
        <button className='btn btn-secondary' onClick={() => toast.success("this success toast")}>  click me </button>

        <SignedOut>
            <SignInButton>
                <button>Login</button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
            <SignOutButton/>
        </SignedIn>

        <UserButton/>

    </div>
  )
}

export default HomePage