import { create } from "zustand";

export interface IUseAlert {
    message: string | string[];
    isAlertOpen:boolean;
    type:string;
    onOpenAlert: (message:string | string[],type:string) => void;
    onCloseAlert: () => void;
}

const useAlert = create<IUseAlert>((set) => ({
      message:"",
      isAlertOpen: false,
      type:"",
      onOpenAlert: (message: string | string[], type:string) => {
         set({
            message,
            type,
            isAlertOpen:true 
         });
      },
      onCloseAlert: () => {
         set({
            message:"",
            isAlertOpen: false
         });
      }
}));

export default useAlert;