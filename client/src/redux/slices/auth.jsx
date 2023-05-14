import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import host from '../../axios'
export const fetchAuth = createAsyncThunk('/fetchAuth', async (params) => {
    const {data} = await host.post('/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('/fetchRegister', async (params) => {
    const {data} = await host.post('/registration', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('/fetchAuthMe', async () => {
    const {data} = await host.get('/profile')
    return data
})
const initialState = {
    data: null,
    status: 'loading',
    role: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
            state.role = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.data = null
            state.role = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            action.payload.role === 'ADMIN' ? state.role = true : state.role = false
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error'
            state.data = null
            state.role = null
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null
            state.role = null
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            action.payload.role === 'ADMIN' ? state.role = true : state.role = false
            
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null
            state.role = null
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
            state.role = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            action.payload.role === 'ADMIN' ? state.role = true : state.role = false      
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
            state.role = null
        }
        
    }
})


export const selectIsAuth = state => Boolean(state.auth.data)
export const userId = state => state.auth.data._id
export const selectIsAdmin = state => state.auth.role
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions