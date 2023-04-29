import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllOrdersData = createAsyncThunk('getAllOrdersSlice/getAllOrdersData', async (userId) => {
    const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`)
    return data
})

const initialState = { data: [] }

const getAllOrdersSlice = createSlice({
    name: "getAllOrdersSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const getAllOrdersSliceReducer = getAllOrdersSlice.reducer