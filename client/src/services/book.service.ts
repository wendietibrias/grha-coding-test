import axios from "axios";
import { ICreateBookInterface } from "../interfaces/form/create_book.interface";
import { IUpdateBookInterface } from "../interfaces/form/update_book.interface";

const token = JSON.parse(localStorage.getItem('auth:token')||'null')||null;

const APIBook = axios.create({
    baseURL:`${import.meta.env.VITE_APP_BASE_API_URL}/book`,
    headers: {
        Authorization:`Bearer ${token}`
    }
});

export const getAllBook = async (page:number,perPage:number) => {
    const { data } = await APIBook.get(`/all?page=${page}&per_page=${perPage}`);
    return data;
}

export const getBookDetail = async (id:number = 1) => {
    const { data } = await APIBook.get(`/${id}`);
    return data;
}

export const createBook = async (formData: ICreateBookInterface) => {
    const { data } = await APIBook.post(`/create`,formData);
    return data;
}

export const deleteBook = async (id:number) => {
    const { data } = await APIBook.delete(`/delete/${id}`);
    return data;
}

export const updateBook = async (id:number,book: IUpdateBookInterface) => {
    const { data } = await APIBook.patch(`/update/${id}`, book);
    return data;
}