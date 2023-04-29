import axios from 'axios';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getcategoryDetails = createAsyncThunk('categoryDetailsSlice/getcategoryDetails', async (id) => {
    try {
        const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`)
        return data
    } catch (error) {
        console.log(error);
    }
})

const initialState = { data: [] }

const categoryDetailsSlice = createSlice({
    name: 'categoryDetailsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getcategoryDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const categoryDetailsSliceReducer = categoryDetailsSlice.reducer