import create from "zustand";
import { persist } from "zustand/middleware";
import { TripData } from "../types/Trip";
interface TripDetails {
  departureTerminal?: string;
  arrivalTerminal?: string;
  availableTrip?: string;
  returnTrip?: string | null; // null or undefined if one-way
  departureSeatNumbers?: number[];
  returnSeatNumbers?: string[] | null; // null or undefined if one-way
  travellingWithAChild?: string;
  child1Name?: string;
  child1Age?: string;
  child1Gender?: string;
  child2Name?: string;
  child2Age?: string;
  child2Gender?: string;
  nextOfKinName?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinEmail?: string;
  beneficiaries?: {
    name: string;
    email: string;
    phoneNumber: string;
  }[];
  sendEmailToNextOfKin?: boolean;
  totalTripCost?: string;
}

interface StoreState {
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  trips: TripData[];
  addTrip: (trip: TripData) => void;
  resetTrips: () => void;
  oneWayTripPayload: {
    tripType: string;
    from: string;
    to: string;
    date: string | null;
    adult: number;
    child: number;
  } | null;
  setOneWayTripPayload: (payload: StoreState["oneWayTripPayload"]) => void;
  tripDetails: TripDetails; // Add tripDetails to state
  setTripDetails: (details: TripDetails) => void; // Method to update tripDetails
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedMenu: "BookingHistory",
      setSelectedMenu: (menu) =>
        set((state) => ({
          selectedMenu:
            typeof menu === "function" ? menu(state.selectedMenu) : menu,
        })),
      trips: [],
      addTrip: (trip) =>
        set((state) => {
          // Add the trip only if it does not exist already
          const tripExists = state.trips.some(
            (existingTrip) => existingTrip._id === trip._id
          );

          const updatedTrips = tripExists
            ? state.trips
            : [...state.trips, trip];

          // Update local storage as well
          localStorage.setItem("trip-store", JSON.stringify(updatedTrips));

          return { trips: updatedTrips };
        }),
      resetTrips: () => {
        // Reset trips array and local storage
        set({ trips: [] });
        localStorage.removeItem("trip-store");
      },
      oneWayTripPayload: null,
      setOneWayTripPayload: (payload) => set({ oneWayTripPayload: payload }),
      tripDetails: {
        departureTerminal: "",
        arrivalTerminal: "",
        availableTrip: "",
        returnTrip: null,
        departureSeatNumbers: [],
        returnSeatNumbers: null,
        travellingWithAChild: "",
        child1Name: "",
        child1Age: "",
        child1Gender: "",
        child2Name: "",
        child2Age: "",
        child2Gender: "",
        nextOfKinName: "",
        nextOfKinPhoneNumber: "",
        nextOfKinEmail: "",
        beneficiaries: [
          {
            name: "",
            email: "",
            phoneNumber: "",
          },
        ],
        sendEmailToNextOfKin: true,
        totalTripCost: "",
      },
      setTripDetails: (details) => set({ tripDetails: details }),
    }),
    {
      name: "trip-store", // unique name for the storage key
      getStorage: () => localStorage, // (optional) default is localStorage
    }
  )
);

export default useStore;
