import { createSlice } from '@reduxjs/toolkit'

const continueWatchingSlice = createSlice({
    name: "continueWatching",
    initialState: {
        data : []
    },
    reducers : {
        addCW : (state, action) => {
            state.data = action.payload;
        }
    }
})

export const {addCW} = continueWatchingSlice.actions;
export default continueWatchingSlice.reducer;