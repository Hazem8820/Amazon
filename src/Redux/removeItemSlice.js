import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const removeItemFromCart = createAsyncThunk('removeItem/removeItemFromCart', async (productId) => {
    const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, { headers: { 'token': localStorage.getItem('userToken') } })
    return data
})

const initialState = {
    data: []
}

const removeItem = createSlice({
    name: 'removeItem',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const removeItemReducer = removeItem.reducer