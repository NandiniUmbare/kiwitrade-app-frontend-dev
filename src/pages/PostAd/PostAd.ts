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
    categories: Category; 
    selectedCategory:number; 
    groups:Group; 
    selectedGroup:number; 
    typeData:Type;
    selectedType:number;
}

export interface DistrictType {
    distId: number;
    distName: string;
}

export interface FormDataType {
    title: string;
    district: number;
    city: number;
    suburb: number;
    price:number;
    currency: string;
    reason: string;
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