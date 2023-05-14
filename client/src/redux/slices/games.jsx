import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import host from '../../axios'

export const fetchGames = createAsyncThunk('/games', async () => {
    const {data} = await host.get('/games')
    return data
})
export const fetchGamesByCategory = createAsyncThunk('/games/category', async (id) => {
    const {data} = await host.get(`/games/category/${id}`)
    return data
})
export const fetchCategories = createAsyncThunk('/categories', async () => {
    const {data} = await host.get('/categories')
    return data
})
export const addGame = createAsyncThunk('/addGame', async (params) => {
    const {data} = await host.post('/games', params)
    return data
})

export const deleteGame = createAsyncThunk('/deleteGame', async (id) => {
    await host.delete(`/games/${id}`)
})

export const addCategory = createAsyncThunk('/addCategory', async (params) => {
    const {data} = await host.post('/categories', params)
    return data
})

export const deleteCategory = createAsyncThunk('/deleteCategory', async (id) => {
    await host.delete(`/categories/${id}`)
})

const initialState = {
    games: {
        items: [],
        status: 'loading'
    },
    categories: {
        items: [],
        status: 'loading'
    },

}

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGames.pending]: (state) => {
            state.games.items = []
            state.games.status = 'loading'
        },
        [fetchGames.fulfilled]: (state, action) => {
            state.games.items = action.payload
            state.games.status = 'loaded'
        },
        [fetchGames.rejected]: (state) => {
            state.games.items = []
            state.games.status = 'error'
        },
        [fetchGamesByCategory.pending]: (state) => {
            state.games.items = []
            state.games.status = 'loading'
        },
        [fetchGamesByCategory.fulfilled]: (state, action) => {
            state.games.items = action.payload
            state.games.status = 'loaded'
        },
        [fetchGamesByCategory.rejected]: (state) => {
            state.games.items = []
            state.games.status = 'error'
        },
        [fetchCategories.pending]: (state) => {
            state.categories.items = []
            state.categories.status = 'loading'
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories.items = action.payload
            state.categories.status = 'loaded'
        },
        [fetchCategories.rejected]: (state) => {
            state.categories.items = []
            state.categories.status = 'error'
        },
        [addGame.pending]: (state) => {
            state.games.items = []
            state.games.status = 'loading'
        },
        [addGame.fulfilled]: (state, action) => {
            state.games.items = action.payload
            state.games.status = 'loaded'
        },
        [addGame.rejected]: (state) => {
            state.games.items = []
            state.games.status = 'error'
        },
        [addCategory.pending]: (state) => {
            state.categories.items = []
            state.categories.status = 'loading'
        },
        [addCategory.fulfilled]: (state, action) => {
            state.categories.items = []
            state.categories.status = 'loaded'
        },
        [addCategory.rejected]: (state) => {
            state.categories.items = []
            state.categories.status = 'error'
        },
        [deleteGame.pending]: (state, action) => {
            state.games.items = state.games.items.filter(obj => obj._id !== action.meta.arg)
        },
        [deleteCategory.pending]: (state, action) => {
            state.categories.items = state.categories.items.filter(obj => obj._id !== action.meta.arg)
        },

    }
})

export const gamesReducer = gamesSlice.reducer