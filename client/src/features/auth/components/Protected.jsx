import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'


function Protected({children}) {
    const user = useSelector(selectLoggedInUser)
    //console.log('Logged in user',user);
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    //console.log('Displaying children');
    return  children
}

export default Protected