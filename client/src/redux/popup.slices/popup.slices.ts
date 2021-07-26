import { createSlice } from '@reduxjs/toolkit'

type PopupConfigSlice = {
    isOpenSignInOrUpForm : boolean;
    isSigningIn : boolean;
}

const initialState: PopupConfigSlice = {
    isOpenSignInOrUpForm: false,
    isSigningIn: false
}

const popupSlices = createSlice({
    name: 'popupConfig',
    initialState,
    reducers: {
        openSignInOrUpForm(state) {
            state.isOpenSignInOrUpForm = true;
        },
        closeSignInOrUpForm(state) {
            state.isOpenSignInOrUpForm = false;
        },
        setToSignIn(state) {
            state.isSigningIn = true;
        },
        setToSignUp(state) {
            state.isSigningIn = false;
        }
    }
});

export const {
    openSignInOrUpForm, closeSignInOrUpForm,
    setToSignIn, setToSignUp
} = popupSlices.actions
export default popupSlices.reducer