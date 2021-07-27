import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import userReducer from './user.slices/user.slices';
import popupReducer from "./popup.slices/popup.slices";
import fetchingReducer from "./fetching.slices/fetching.slices";

const rootReducer = combineReducers({
    user: userReducer,
    popup: popupReducer,
    fetching: fetchingReducer
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
    key: 'v-rental',
    version: -1,
    storage,
    whitelist: [],
}

export default persistReducer(persistConfig, rootReducer)