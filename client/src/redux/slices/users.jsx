import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import host from '../../axios'

export const fetchUsers = createAsyncThunk('/fetchUsers', async () => {
    const {data} = await host.get('/users')
    return data
})

export const updateUser = createAsyncThunk('/updateUser', async (id, values) => {
    const {data} = await host.delete(`/users/${id}/edit`)
    return data
})
export const deleteUser = createAsyncThunk('/deleteUser', async (id) => {
    const {data} = await host.delete(`/users/${id}`)
    return data
})

const initialState = {
    users: {
    items: null,
    status: 'loading'
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.users.status = 'loading'
            state.users.items = null
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users.status = 'loaded'
            state.users.items = action.payload
        },
        [fetchUsers.rejected]: (state) => {
            state.users.status = 'error'
            state.users.items = null
        },
        [deleteUser.pending]: (state, action) => {
            state.users.items = state.users.items.filter(obj => obj._id !== action.meta.arg)
        },
        
    }
})


export const usersReducer = usersSlice.reducer