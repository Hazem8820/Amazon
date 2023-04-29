import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const visaPaymentData = createAsyncThunk('visaPaymentSlice/visaPaymentData', async (param) => {
    try {
        const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${param[0].id}?url=http://localhost:3000`, { 'shippingAddress': param[1] }, { headers: { 'token': localStorage.getItem('userToken') } })
        return data
    } catch (error) {
        console.log(error);
    }
})


const initialState = { data: [] }

const visaPaymentSlice = createSlice({
    name: 'visaPaymentSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(visaPaymentData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const visaPaymentSliceReducer = visaPaymentSlice.reducer