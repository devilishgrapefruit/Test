import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import host from '../../axios'

export const addOrder = createAsyncThunk('/addOrder', async (id) => {
    const {data} = await host.post(`/basket/${id}`)
    return data
})
export const deleteItem = createAsyncThunk('/deleteItem', async (id) => {
    const {data} = await host.delete(`/basket/${id}`)
    return data
})

export const fetchOrder = createAsyncThunk('/fetchOrder', async () => {
    const {data} = await host.get('/basket')
    return data
})

const initialState = {
    basket: {
        items: [],
        totalCost: 0,
        status: 'loading',
    }
}
const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOrder.pending]: (state) => {
            state.basket.items = null
            state.basket.totalCost = 0
            state.basket.status = 'loading'
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.basket.items.push(action.payload)
            state.basket.totalCost = action.payload.totalCost
            state.basket.status = 'loaded'
        },
        [fetchOrder.rejected]: (state) => {
            state.basket.items = null
            state.basket.totalCost = 0
            state.basket.status = 'error'
        },
        [addOrder.pending]: (state) => {
            state.basket.items = null
            state.basket.totalCost = 0
            state.basket.status = 'loading'
        },
        [addOrder.fulfilled]: (state, action) => {
            state.basket.items.push(action.payload)
            state.basket.totalCost = action.payload.totalCost
            state.basket.status = 'loaded'
        },
        [addOrder.rejected]: (state) => {
            state.basket.items = null
            state.basket.totalCost = 0
            state.basket.status = 'error'
        },
        [deleteItem.pending]: (state, action) => {
            state.basket.items = state.basket.items.filter(obj => obj._id !== action.meta.arg)
        },
        
    }
})


export const basketReducer = basketSlice.reducer



















