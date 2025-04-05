import { Category } from "@/redux/slice/category";

export interface Group {
    groupId: number;
    groupName: string;
    categoryId: number;
}

export interface Type {
    typeId: number;
    typeName: string;
    groupId: number;
    categoryId: number;
}

export interface AdDetailsTypes {
    categories: Category[]; 
    selectedCategory:number; 
    groups:Group[]; 
    selectedGroup:number; 
    typeData:Type[];
    selectedType:number;
    setNext: (next: boolean) => void;
    postId: string | null;
    postType: string;
    setSelectedCategory: (categoryId: number) => void;
    setSelectedGoup: (groupId: number) => void;
    setSelectedType: (typeId: number) => void;
}

export interface DistrictType {
    distId: number;
    distName: string;
}

export interface FormDataType {
    title: string;
    districtId: number;
    cityId: number;
    suburbId: number;
    createdDate: Date;
    createdBy?: number;
    userId?: string;
    coordinate: string;
    categoryId: number;
    groupId: number;
    typeId: number;
    photo: string;
    price?:number;
    noPrice?: string;
    description: string;
    optionalData: string;
}

export interface CityType {
    cityId: number;
    distId: number;
    cityName: string;
}

export interface SuburbType {
    suburbId: number;
    cityId: number;
    distId: number;
    suburbName: string;
}

export interface PostErrorsType { 
    title?: string;
    districtId?: string;
    cityId?: string;
    suburbId?: string;
    description?: string;
}