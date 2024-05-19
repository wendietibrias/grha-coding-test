import { create } from "zustand";

export interface IUseSidebar {
    isShowSidebar:boolean;
    openSidebar: () => void, 
    closeSidebar: () => void
}

const useSidebar = create<IUseSidebar>((set) => ({
    isShowSidebar: false,
    openSidebar: () => set({ isShowSidebar:true }),
    closeSidebar: () => set({ isShowSidebar:false })
}));

export default useSidebar;