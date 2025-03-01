import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryjson from "@/api/catpgory.json";
import React from "react";

export interface Category {
    icon: React.ReactNode;
    imageUrl: string | undefined;
    categoryId:number;
    categoryName:string;
}

interface DataState {
    loading: boolean;
    categories: Category[];
    selectedCategory: number | null;
    selectedGroup: number | null;
    error: string | null;
}
  
export const getCategories = createAsyncThunk<Category[]>(
    'data/getCategories', // Name of the action
    async () => {
      try {
              // const response = await axiosInstance.get('/api/Lookup/category');
              const data = categoryjson.data as Category[];
              return data;
          } catch (error) {
              console.log(error);
              throw new Error('Failed to fetch categories');
          }
        }
  );
  
const initialState: DataState = {
    loading: false,
    categories: [],
    selectedCategory: null,
    selectedGroup: null,
    error: null,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null; 
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});

// export const { setCategories } = categorySlice.actions;
export const {setSelectedCategory, setSelectedGroup} = categorySlice.actions;
export default categorySlice.reducer;

