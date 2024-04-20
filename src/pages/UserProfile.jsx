import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserProfileComponent from '../features/user/components/UserProfile'

function UserProfile() {
  return (
        <>
        <NavBar>
            <h1 className='mx-auto text-4xl font-semibold'>My Profile</h1>
         <UserProfileComponent/>
        </NavBar>
        </>
  )
}

export default UserProfile