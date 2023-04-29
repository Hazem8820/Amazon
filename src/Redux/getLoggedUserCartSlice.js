import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getLoggedUserCart = createAsyncThunk('loggedUserCart/getLoggedUserCart', async () => {
    try {
        const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', { headers: { 'token': localStorage.getItem('userToken') } })
        return data
    } catch (error) {
        console.log('err');
    }
})

const initialState = { data: [] }

const loggedUserCart = createSlice({
    name: 'loggedUserCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLoggedUserCart.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const loggedUserCartReducer = loggedUserCart.reducer