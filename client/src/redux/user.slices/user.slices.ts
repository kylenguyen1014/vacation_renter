import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserFull } from '../../shared/interfaces/User'

type UserSlice = {
    currentUser: UserFull | undefined
}
const initialState: UserSlice = {
    currentUser: undefined
}

const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveCurrentUser(state, action: PayloadAction<UserFull>) {
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