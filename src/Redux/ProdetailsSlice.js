import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetalis = createAsyncThunk('prodetails/getProductDetalis', async (id) => {
    const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`).catch((error) => {
        console.log(error);
    })
    return data
})

const initialState = { data: [] }

const productDetails = createSlice({
    name: 'prodetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetalis.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const productDetailsReducer = productDetails.reducer
