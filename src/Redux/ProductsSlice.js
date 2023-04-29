import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products').catch((error) => {
        console.log(error);
    })
    return data
})

const initialState = { data: [] }

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const productsReducer = productsSlice.reducer