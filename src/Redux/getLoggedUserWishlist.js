import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getLoggedUserWishlist = createAsyncThunk('loggedUserWishlist/getLoggedUserWishlist', async () => {
    try {
        const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist', { headers: { 'token': localStorage.getItem('userToken') } })
        return data
    } catch (error) {
        console.log(error);
    }
})

const initialState = { data: [] }

const loggedUserWishlist = createSlice({
    name: 'loggedUserWishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLoggedUserWishlist.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const loggedUserWishlistReducer = loggedUserWishlist.reducer