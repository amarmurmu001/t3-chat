import { create } from "zustand"
export const useChatStore = create((set,get) => ({
    activeChatId: null,
    setActiveChatId: (id) => set({ activeChatId: id }),
    
    
})) 