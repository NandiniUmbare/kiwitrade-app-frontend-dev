import { axiosInstance } from "./index";

export const getGroup = async(categoryId: number) => {
    try {
        const response = await axiosInstance.get(`/api/Lookup/group?categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getType = async( groupId:number,categoryId: number,) => {
    try {
        const response = await axiosInstance.get(`/api/Lookup/type?groupId=${groupId}&categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDistrict = async() => {
    try {
        const response = await axiosInstance.get('/api/Lookup/district');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCity = async(distId: number) => {
    try {
        const response = await axiosInstance.get(`/api/Lookup/city?districtId=${distId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSuburb = async(cityId:number, distId: number) => {
    try {
        const response = await axiosInstance.get(`/api/Lookup/suburb?cityId=${cityId}&districtId=${distId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}