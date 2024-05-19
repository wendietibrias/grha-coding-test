import axios from "axios";
import { ILoginField } from "../interfaces/form/login.interface";
import { IRegisterField } from "../interfaces/form/register.interface";

const APIAuth = axios.create({
    baseURL:`${import.meta.env.VITE_APP_BASE_API_URL}/auth`
});

export const loginService = async (formData: ILoginField) => {
    const { data } = await APIAuth.post('/login', formData);
    return data;
}

export const registerService = async (formData: IRegisterField) => {
    const { data } = await APIAuth.post('/register' , formData);
    return data;
}