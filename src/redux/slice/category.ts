import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryjson from "@/api/catpgory.json";
import React from "react";
import { Group, Type } from "@/pages/PostAd/PostAd";
import { axiosInstance } from "@/api";

export interface Category {
    icon: React.ReactNode;
    imageUrl: string | undefined;
    categoryId:number;
    categoryName:string;
}

interface DataState {
    loading: boolean;
    categories: Category[];
    groups: Group[];
    types: Type[];
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

export const getGroups = createAsyncThunk<Group[], number>(
  'data/getGroups',
  async (categoryId) => {
    try { 
      const response = await axiosInstance.get(`https://api.ekiwitrade.com/api/Lookup/group?categoryId=${categoryId}`);
      return response.data.data as Group[];
    }
    catch (error) {
      console.log(error);
      throw new Error('Failed to fetch groups');
    }
  }
);
  
export const getTypes = createAsyncThunk<Type[], { categoryId: number, groupId: number }>(
  'data/getTypes',
  async ({ categoryId, groupId }) => {
    try { 
      const response = await axiosInstance.get(`https://api.ekiwitrade.com/api/Lookup/type?groupId=${groupId}&categoryId=${categoryId}`);
      return response.data.data as Type[];
    }
    catch (error) {
      console.log(error);
      throw new Error('Failed to fetch types');
    }
  }
);

const initialState: DataState = {
    loading: false,
    categories: [],
    groups: [],
    types: [],
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
    },
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
      }),
    builder
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        state.error = null; 
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      }),
    builder
      .addCase(getTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
        state.error = null; 
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});

// export const { setCategories } = categorySlice.actions;
export const {setSelectedCategory, setSelectedGroup} = categorySlice.actions;
export default categorySlice.reducer;

