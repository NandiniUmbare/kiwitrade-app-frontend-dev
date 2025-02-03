import { createSlice } from "@reduxjs/toolkit";

const ImageSlice = createSlice({
    name: "images",
    initialState: {
        images: [],
    },
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        }
    }
});

export const { setImages } = ImageSlice.actions;
export default ImageSlice.reducer;