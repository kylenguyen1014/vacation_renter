import { persistStore } from 'redux-persist'
import rootReducer from './root-reducer'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    })
})

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export { store, persistor };