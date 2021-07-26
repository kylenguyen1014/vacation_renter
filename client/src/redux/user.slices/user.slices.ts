import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../shared/interfaces/User'

type UserSlice = {
    currentUser: User | undefined
}
const initialState: UserSlice = {
    currentUser: undefined
}

const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload
        },
        clearCurrentUser(state) {
            state.currentUser = undefined
        }
    }
});

export const {
    saveCurrentUser, clearCurrentUser
} = userSlices.actions
export default userSlices.reducer