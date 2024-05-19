import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const token = JSON.parse(localStorage.getItem("auth:token") || 'null') || null;

export interface IUseAuth {
    user: {
        sub: number | string;
        exp: number;
        name: string;
        email: string;
    } | null;
    token: string  | null;
    onLogin: (token:string) => void;
    onLogout: () => void;
}

const useAuth = create<IUseAuth>((set)=>({
     user: token ? jwtDecode(token) : null,
     token:token,
     onLogin: (token:string) => {
        localStorage.setItem("auth:token" , JSON.stringify(token));
        set({
            token,
            user: jwtDecode(token)
        });
     },
     onLogout: () => {
        localStorage.removeItem('auth:token');
        set({
            token:null,
            user:null 
        });
     }
}));

export default useAuth;