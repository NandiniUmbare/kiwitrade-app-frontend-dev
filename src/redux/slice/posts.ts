import { axiosInstance } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Post {
    optionalData: string;
    userId: string; 
    id: number;
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
    userPosts: Post[];
}

const initialState: PostState = {
    posts: [],
    userPosts: []
};
export const getPosts = createAsyncThunk<Post[]>(
    'data/getPosts', // Name of the action
    async () => {
        try {
            const response = await axiosInstance.get('https://api.ekiwitrade.com/GetProductByCatGroupType');
            console.log(response);
            return response.data as Post[];
        } catch (error: any) {
            return error.response.data;
            throw new Error('Failed to fetch categories');
        }
    }
);

export const getUserPosts = createAsyncThunk<Post[], number>(
    'data/getUserPosts', // Name of the action
    async (userId: number) => {
        try {
            const response = await axiosInstance.get(`https://api.ekiwitrade.com/GetProductByUserId?userId=${userId || 123}`);
            console.log(response);
            return response.data[0] as Post[];
        } catch (error: any) {
            return error.response.data;
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
        }),
        builder.addCase(getUserPosts.fulfilled, (state, action) => {
            state.userPosts = action.payload;
        })
     },
});
export const { } = postSlice.actions;   
export default postSlice.reducer;