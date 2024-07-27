import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOut , checkAuth} from "./authAPI";
import { updateUser } from '../user/userAPI'

const initialState ={
    loggedInUserToken: JSON.parse(localStorage.getItem('loggedInUser')) || null , 
    status: 'idle',
    error: null
}

export const createUserAsync = createAsyncThunk(
    'user/createUser' ,
    async (userData) => {
        const response = await createUser(userData) ;
        return response.data ; 
    }
)

export const checkUserAsync = createAsyncThunk(
    'user/checkUser' ,
    async (loginInfo , {rejectWithValue}) => {
        try {
            //console.log('Auth slice ',loginInfo);
            const response = await checkUser(loginInfo) ;
            
            return response.data ; 
        } catch (error) {
            console.log(error);
            return rejectWithValue(error)
        }
    }
)

export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth' ,
    async () => {
        try {
            //console.log('Auth slice ',loginInfo);
            const response = await checkAuth() ;
            
            return response.data ; 
            
        } catch (error) {
            console.log(error);
            // return rejectWithValue(error)
        }
    }
)

export const signOutAsync = createAsyncThunk(
    'user/signOut' ,
    async (id) => {
        const response = await signOut(id) ;
        return response.data ; 
    }
)
export const authSlice = createSlice({
    name: 'auth' ,
    initialState ,
    reducers: {

    } ,
    extraReducers: (builder) => {
        builder
           .addCase(createUserAsync.pending ,(state) => {
            state.status = 'loading' ; 
           })
           .addCase(createUserAsync.fulfilled ,(state ,action) => {
            state.status = 'idle' ;
            console.log('CreateUser async check', action?.payload) ; 
            state.loggedInUserToken =  action?.payload ; 
            if(action?.payload)
                localStorage.setItem('loggedInUser', JSON.stringify(action?.payload));
           })
           .addCase(checkUserAsync.pending ,(state) => {
            state.status = 'loading' ; 
           })
           .addCase(checkUserAsync.fulfilled ,(state ,action) => {
            state.status = 'idle' ;
            // console.log('Action payload filling loggedinUserser' , action.payload);
            state.loggedInUserToken =  action?.payload ; 
            if(action?.payload)
            localStorage.setItem('loggedInUser', JSON.stringify(action?.payload));
            // console.log('Setting user in localstorage ',action?.payload);
            // console.log('State-> auth',state.auth);
           })
           .addCase(checkUserAsync.rejected ,(state ,action) => {
            state.status = 'idle' ;
            console.log('Action payload in checkUserAsync.rejected ',action.payload.err.message);
            state.error =  action.payload.err
           })
           .addCase(signOutAsync.pending ,(state ,action) => {
            state.status = 'idle' ;
           })
           .addCase(signOutAsync.fulfilled ,(state ,action) => {
            state.status = 'idle' ;
            state.loggedInUserToken = null ;
            localStorage.clear();
           })
    }
})

export const selectLoggedInUser = (state) =>{
    // console.log('Logging auth ' , state.auth);
    return state.auth.loggedInUserToken ; 
} 
export const selectError = (state) => state.auth.error
export default authSlice.reducer ; 
