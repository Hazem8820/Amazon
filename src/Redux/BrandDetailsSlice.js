import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBrandDetails = createAsyncThunk('brandsDetails/getBrandDetails', async (id) => {
    try {
        const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)
        return data
    } catch (error) {
        console.log(error);
    }
})

const initialState = { data: [] }

const brandsDetails = createSlice({
    name: 'brandsDetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getBrandDetails.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const brandsDetailsReducer = brandsDetails.reducer
