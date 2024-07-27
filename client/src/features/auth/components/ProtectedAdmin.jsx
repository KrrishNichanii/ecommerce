import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice'


function ProtectedAdmin({children}) {
    const userInfo = useSelector(selectUserInfo);
    const user = useSelector(selectLoggedInUser);
  
    if(!user){
        return <Navigate to='/login'></Navigate>
    }

    if(user && user.role !== 'admin'){
        return <Navigate to='/'></Navigate>
    }
    return  children
  
}

export default ProtectedAdmin