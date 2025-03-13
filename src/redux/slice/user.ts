import { createSlice } from "@reduxjs/toolkit";

export interface UserDetails {
    userId: number;
    userName: string;
    email: string;
}
export interface UserState {
    user: UserDetails[] | null;
    authToken: string;
}
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