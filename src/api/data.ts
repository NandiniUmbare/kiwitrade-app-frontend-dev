import { FormDataType } from "@/pages/PostAd/PostAd";
import { axiosInstance } from "./index";
import axios from "axios";

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

import { AxiosProgressEvent } from "axios";
import { FormDataProps } from "@/pages/User/Register";

export const uploadImage = async(file: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
    try {
        const response = await axios.post('https://api.ekiwitrade.com/UploadFile', 
            file,
            {
                headers: {
                  "accept": "*/*",
                  "Content-Type": "multipart/form-data", 
                },
                onUploadProgress
            }
        )
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const postAd = async(data: FormDataType) => {
    try {
        const response = await axiosInstance.post('https://api.ekiwitrade.com/UpsertProduct', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getPostBrowseByCategory = async(categoryId: number, groupId:number, typeId: number) => {
    try {
        if(typeId === 0){
            const response = await axiosInstance.get(`/GetProductByCatGroup?categoryId=${categoryId}&groupId=${groupId}`);
            return response.data;
        } else {
            const response = await axiosInstance.get(`/GetProductByCatGroupType?categoryId=${categoryId}&groupId=${groupId}&TypeId=${typeId}`);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (data: FormDataProps) => {
    try {
        const response = await axiosInstance.post('/api/Users/register', data);
        return response;
    } catch (error: any) {
        return error.response;
    }
}

export const loginUser = async(data: {email: string, password: string}) => {
    try {
        const response = await axiosInstance.post('/api/Users/login',data);
        return response.data;
    } catch (error:any) {
        return error.response.data;
    }
}