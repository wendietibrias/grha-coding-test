import axios from "axios";
import { ICategoryResponse } from "../interfaces/api_response/category.response";
import { ICreateCategoryInterface } from "../interfaces/form/create_category.interface";

const token = JSON.parse(localStorage.getItem('auth:token')||'null')||null;


const APICategory = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_API_URL}/category`,
    headers: {
        Authorization:`Bearer ${token}`
    }
});

export const getAllCategoryForSelectOption =  async () => {
    const { data } = await APICategory.get(`/select-option`);
    if(data){
        data.push({
            label:"Other",
            value:"Other",
            category_title:"Other"
        });


        return data.map((item:ICategoryResponse)=> {
             return {
                ...item,
                label: item.category_title,
                value: item.category_title,
             }
        })
    };

    return [];
}

export const getAllCategory = async (page:number,per_page:number) => {
    const { data } = await APICategory.get(`/all?page=${page}&per_page=${per_page}`);
    return data;
}  

export const createCategory = async (formData: ICreateCategoryInterface) => {
    const { data } = await APICategory.post(`/create`, formData);
    return data;
}

export const deleteCategory = async (id:number) => {
    const { data } = await APICategory.delete(`/delete/${id}`);
    return data;
}
