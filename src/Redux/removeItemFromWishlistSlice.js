import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const removeItemFromWishlist = createAsyncThunk('removeItemWl/removeItemFromWishlist', async (productId) => {
    const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`, { headers: { 'token': localStorage.getItem('userToken') } })
    window.location.reload()
    return data
})

const initialState = {
    data: []
}

const removeItemSlice = createSlice({
    name: 'removeItemWl',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(removeItemFromWishlist.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const removeItemSliceReducer = removeItemSlice.reducer