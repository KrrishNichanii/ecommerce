import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import {  fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from "./userAPI";

const initialState = {
    status: 'idle' ,
    userInfo: null , //this info will be used in case of detailed
    //user info , while auth will only be used for loggedInUser
    // id etc checks
} ;

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders' ,
    async (userId) => {
        const response = await fetchLoggedInUserOrders(userId) ;
        return response.data ;
    }
)

export const updateUserAsync = createAsyncThunk(
    'user/updateUser' ,
    async (updatedUser) => {
        const response = await updateUser(updatedUser);
        return response.data ;
    }
)

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser' ,
    async (id) => {
        const response = await fetchLoggedInUser(id);
        return response.data ;
    }
)

export const  userSlice = createSlice({
    name: 'user' ,
    initialState ,
    reducers: {

    } , 
    extraReducers:  (builder) =>{
        builder
           .addCase(fetchLoggedInUserOrdersAsync.pending ,(state , action) =>{
            state.status = 'loading' ;
            console.log('pending getcurrentloggedinuser');
           })
           .addCase(fetchLoggedInUserOrdersAsync.fulfilled , (state , action) =>{
            state.status = 'idle' , 
            //this info can be different or more from logged-in User info
            console.log('UserInfo in userSlice',action.payload);
            state.userInfo.orders = action.payload ; 
           })
           .addCase(updateUserAsync.pending ,(state , action) =>{
            state.status = 'loading' ;
           })
           .addCase(updateUserAsync.fulfilled , (state , action) =>{
            state.status = 'idle' , 
            //this info can be different or more from logged-in User info
            state.userInfo = action.payload ; 
           })
           .addCase(fetchLoggedInUserAsync.pending ,(state , action) =>{
            state.status = 'loading' ;
           })
           .addCase(fetchLoggedInUserAsync.fulfilled , (state , action) =>{
            state.status = 'idle' , 
            //this info can be different or more from logged-in User info
            state.userInfo= action.payload ; 
           })
    }
})

export const selectUserOrders = (state) => state.user.userInfo.orders ;
export const selectUserInfo = (state) =>{
    //console.log('User in selectUser',state.user.userInfo);
    return state.user.userInfo ; 
} 
export default userSlice.reducer
