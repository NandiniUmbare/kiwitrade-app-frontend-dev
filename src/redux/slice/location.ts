import { axiosInstance } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface DistrictType {
    districtId: number;
    districtName: string;
}

export interface CityType {
    cityId: number;
    cityName: string;
}

export interface SuburbType {
    suburbId: number;
    suburbName: string;
}

export const getDistricts = createAsyncThunk<DistrictType[]>(
    'location/getDistricts',
    async () => {
        try {
            const response = await axiosInstance.get('https://api.ekiwitrade.com/api/Lookup/district');
            return response.data.data as DistrictType[];
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch districts');
        }
    }
);

export const getCities = createAsyncThunk<CityType[], number>(
    'location/getCities',
    async (districtId) => {
        try {
            const response = await axiosInstance.get(`https://api.ekiwitrade.com/api/Lookup/city?districtId=${districtId}`);
            return response.data.data as CityType[];
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch cities');
        }
    }
);

export const getSuburbs = createAsyncThunk<SuburbType[], { cityId: number, districtId: number }>(
    'location/getSuburbs',
    async ({ cityId, districtId }) => {
        try {
            const response = await axiosInstance.get(`https://api.ekiwitrade.com/api/Lookup/suburb?cityId=${cityId}&districtId=${districtId}`);
            return response.data.data as SuburbType[];
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch suburbs');
        }
    }
);

const locationSlice = createSlice({
    name: "location",
    initialState: {
        districts: [] as DistrictType[],
        cities: [] as CityType[],
        suburbs: [] as SuburbType[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDistricts.fulfilled, (state, action) => {
            state.districts = action.payload;
        });
        builder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload;
        });
        builder.addCase(getSuburbs.fulfilled, (state, action) => {
            state.suburbs = action.payload;
        });
    },
});

export default locationSlice.reducer;