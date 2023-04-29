import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const cashPaymentData = createAsyncThunk('cashPaymentSlice/cashPaymentData', async (param) => {
    try {
        const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${param[0].id}`, { 'shippingAddress': param[1] }, { headers: { 'token': localStorage.getItem('userToken') } })
        return data
    } catch (error) {
        console.log(error);
    }
})


const initialState = { data: [] }

const cashPaymentSlice = createSlice({
    name: 'cashPaymentSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(cashPaymentData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const cashPaymentSliceReducer = cashPaymentSlice.reducer