
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const updateDataCartQuantity = createAsyncThunk('updateCartQuantity/updateDataCartQuantity', async (param) => {
    const { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${param[0]}`, {
        count: param[1],
    }, { headers: { 'token': localStorage.getItem('userToken') } })
    return data
})

const initialState = { data: [] }

const updateCartQuantity = createSlice({
    name: 'updateCartQuantity',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(updateDataCartQuantity.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const updateCartQuantityReducer = updateCartQuantity.reducer