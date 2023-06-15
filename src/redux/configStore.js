import {configureStore} from '@reduxjs/toolkit'
import ListProductReducer from './slices/Product'
import UserReducer from './slices/User'

export const store = configureStore({
    reducer: {
        ListProductReducer,
        UserReducer
    }
})