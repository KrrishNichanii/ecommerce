import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { fetchProductsByFilters ,fetchBrands ,fetchAllCategories, fetchProductbyId, createProduct, updateProduct } from "./ProductAPI";

const initialState = {
    products: [] , 
    status: 'idle',
    totalItems: 0 ,
    brands:[] ,
    categories: [] ,
    selectedProduct : null
} ;



export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductByIdAsync' ,
    async (id) => {
        const response = await fetchProductbyId(id)
        return response.data ; 
    }
) ;

export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands' ,
    async () => {
        const response = await fetchBrands();
        return response.data ; 
    }
) ;

export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories' ,
    async () => {
        const response = await fetchAllCategories();
        return response.data ; 
    }
) ;

export const createProductAsync = createAsyncThunk(
    'product/createProduct' ,
    async (product) => {
        const response = await createProduct(product);
        return response.data ; 
    }
) ;

export const updateProductAsync = createAsyncThunk(
    'product/updateProduct' ,
    async (update) => {
        //console.log('In async product ',update);
        const response = await updateProduct(update);
        return response.data ; 
    }
) ;

export const fetchProductsByFilterAsync = createAsyncThunk(
    'product/fetchProductsbyFilters' ,
    async ({filter ,sort,pagination ,admin}) => {
        //console.log('fetchProductsByFilterAsync sort',sort);
        const response = await fetchProductsByFilters(filter ,sort ,pagination ,admin);
        return response.data ; 
    }
) ;

export const productSlice = createSlice({
    name: 'product' , 
    initialState ,
    reducers: {
        clearSelectedProduct: (state) => {
              state.selectedProduct = null
        }
    } , 
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductsByFilterAsync.pending ,(state) => {
            state.status ='loading' ; 
        })
        .addCase(fetchProductsByFilterAsync.fulfilled , (state , action) => {
            state.status = 'idle' ;           
            state.products = action.payload.products ; 
            state.totalItems = action.payload.totalItems ; 
        })
        .addCase(fetchBrandsAsync.pending ,(state,action) => {
            state.status ='loading' ; 
        })
        .addCase(fetchBrandsAsync.fulfilled, (state , action) => {
            state.status = 'idle' ; 
            state.brands = action.payload ; 
            console.log('state ->  products' , state.products);
        })
        .addCase(fetchCategoriesAsync.pending ,(state,action) => {
            state.status ='loading' ; 
        })
        .addCase(fetchCategoriesAsync.fulfilled , (state , action) => {
            state.status = 'idle' ; 
            state.categories = action.payload ; 
        })
        .addCase(fetchProductByIdAsync.pending ,(state,action) => {
            state.status ='loading' ; 
        })
        .addCase(fetchProductByIdAsync.fulfilled , (state , action) => {
            state.status = 'idle' ; 
            state.selectedProduct = action.payload ; 
        })
        .addCase(createProductAsync.pending ,(state,action) => {
            state.status ='loading' ; 
        })
        .addCase(createProductAsync.fulfilled , (state , action) => {
            state.status = 'idle' ; 
            state.products.push(action.payload ); 
        })
        .addCase(updateProductAsync.pending ,(state,action) => {
            state.status ='loading' ; 
        })
        .addCase(updateProductAsync.fulfilled , (state , action) => {
            state.status = 'idle' ; 
            const index = state.products.findIndex(product => product.id === action.payload.id) ;
            state.products[index] = action.payload ;
        })
    }
})

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status ;
export const selectTotalItems = (state) => state.product.totalItems;
export const { clearSelectedProduct }  = productSlice.actions ;
export default productSlice.reducer ; 