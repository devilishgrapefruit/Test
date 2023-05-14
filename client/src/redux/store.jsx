import {configureStore} from '@reduxjs/toolkit'
import { gamesReducer } from './slices/games';
import { authReducer } from './slices/auth';
import { usersReducer } from './slices/users';
import { basketReducer } from './slices/basket';

const store = configureStore({
    reducer: {
        games: gamesReducer,
        auth: authReducer,
        users: usersReducer,
        basket: basketReducer,
    }
})

export default store;