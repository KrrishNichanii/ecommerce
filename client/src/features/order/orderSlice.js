import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { createOrder , fetchAllOrders, updateOrder } from "./orderAPI";


const initialState = {
    orders:[] ,
    status:'idle' ,
    currentOrderPlaced:null ,
    totalOrders:0 ,
}

export const createOrderAsync = createAsyncThunk(
    'order/createOrder' ,
    async (order) => {
        const response = await createOrder(order) ;
        return response.data ; 
    }
)

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder' ,
    async (order) => {
        const response = await updateOrder(order) ;
        console.log('Updated order ',response.data);
        return response.data ; 
    }
)
export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fethAllOrders' ,
    async ({sort,pagination}) => {
        const response = await fetchAllOrders({sort,pagination}) ;
        //console.log('Response in fetchAllOrdersAsync ',response.data);
        return response.data ; 
    }
)

export const orderSlice = createSlice({
    name: 'order' ,
    initialState ,
    reducers: {
        resetOrder: (state) =>{
            state.currentOrderPlaced = null ; 
            console.log('Resetting ORDERRRRRRR');
        }
    } ,
    extraReducers: (builder) => {
        builder
           .addCase(createOrderAsync.pending ,(state) => {
            state.status = 'loading' ;
           })
           .addCase(createOrderAsync.fulfilled,(state ,action) => {
            state.status = 'idle' ;
            state.orders.push(action.payload) ;
            state.currentOrderPlaced = action.payload;
           })
           .addCase(fetchAllOrdersAsync.pending ,(state) => {
            state.status = 'loading' ;
           })
           .addCase(fetchAllOrdersAsync.fulfilled,(state ,action) => {
            state.status = 'idle' ;
            state.orders = action.payload.orders ;
            state.totalOrders = action.payload.totalOrders   
           })
           .addCase(updateOrderAsync.pending ,(state,action) => {
            state.status = 'loading' ;
           })
           .addCase(updateOrderAsync.fulfilled,(state,action) => {
            state.status = 'idle' ;
            const index = state.orders.findIndex(order => order.id === action.payload.id)
            state.orders[index] = action.payload ; 
           })
    }
})

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrderPlaced ;
export const selectTotalOrders = (state) => state.order.totalOrders ;
export const selectOrders = (state) => state.order.orders ;

export default orderSlice.reducer
