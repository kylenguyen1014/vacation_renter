import { createSlice } from '@reduxjs/toolkit'

type FetchingSlice = {
    isFetching : boolean;
}
const initialState : FetchingSlice = {
    isFetching: false,
}

const fetchingSlices = createSlice({
    name: 'fetching',
    initialState,
    reducers: {
        fetchDataBegin(state) {
            state.isFetching = true;
        },
        fetchDataStop(state) {
            state.isFetching = false;
        }
    }
});

export const {
    fetchDataBegin, fetchDataStop
} = fetchingSlices.actions
export default fetchingSlices.reducer