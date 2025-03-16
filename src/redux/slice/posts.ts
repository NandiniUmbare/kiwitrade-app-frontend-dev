import { axiosInstance } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Post { 
    postId: number;
    title: string;
    districtId: number;
    cityId: number;
    suburbId: number;
    createdDate: Date;
    createdBy: number;
    coordinate: string;
    categoryId: number;
    groupId: number;
    typeId: number;
    photo: string;
    price?: number;
    noPrice?: string;
    description: string;
}
interface PostState {
    posts: Post[];
}

const initialState: PostState = {
    posts: [],
};
export const getPosts = createAsyncThunk<Post[]>(
    'data/getPosts', // Name of the action
    async () => {
        try {
            const response = await axiosInstance.get('https://api.ekiwitrade.com/GlobalSearch');
            return response.data as Post[];
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch categories');
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
     },
});
export const { } = postSlice.actions;   
export default postSlice.reducer;