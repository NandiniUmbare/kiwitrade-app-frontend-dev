import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        authToken: '',
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.authToken = action.payload;
        }
    }
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;