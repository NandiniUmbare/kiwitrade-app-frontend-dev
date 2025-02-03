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

export const uploadImage = async(file: File) => {
    try {
        const response = await fetch('https://api.ekiwitrade.com/UploadFile',{
            method: 'POST',
            body: file,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const postAd = async(data: any) => {
    try {
        const response = await axiosInstance.post('/UpsertProduct', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}