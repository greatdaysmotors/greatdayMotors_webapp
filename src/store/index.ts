import create from "zustand";

interface StoreState {
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const useStore = create<StoreState>((set) => ({
  selectedMenu: "BookingHistory",
  setSelectedMenu: (menu) =>
    set((state) => ({
      selectedMenu:
        typeof menu === "function" ? menu(state.selectedMenu) : menu,
    })),
}));

export default useStore;
