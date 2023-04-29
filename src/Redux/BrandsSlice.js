import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBrands = createAsyncThunk('Brands/getBrands', async () => {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/brands').catch((error) => {
        console.log(error);
    })
    return data
})

const initialState = { data: [] }

const BrandsSlice = createSlice({
    name: 'Brands',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase((state, action) => {
            state.data = action.payload
        })
    }
})

export const BrandsSliceReducer = BrandsSlice.reducer