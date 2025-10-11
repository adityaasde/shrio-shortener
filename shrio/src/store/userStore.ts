import { create } from "zustand";

interface user {
  email: string;
  id: string;
}

interface userState {
  user: user | null;
  setUser: (user: user) => void;
  logout: () => void;
}



export const userStore = create<userState>((set): userState => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
