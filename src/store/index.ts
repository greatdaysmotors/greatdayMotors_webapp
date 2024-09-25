import create from "zustand";
import { persist } from "zustand/middleware";
import { TripData } from "../types/Trip";

export interface Beneficiary {
  name: string;
  email: string;
  phoneNumber: string;
}
export interface TripDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  departureTerminal?: string;
  arrivalTerminal?: string;
  availableTrip?: string;
  returnTrip?: string | null; // null or undefined if one-way
  departureSeatNumbers?: number[];
  returnSeatNumbers?: string[]; // null or undefined if one-way
  travellingWithAChild?: boolean;
  child1Name?: string;
  child1Age?: string;
  child2Name?: string;
  child2Age?: string;
  nextOfKinName?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinEmail?: string;
  beneficiaries?: Beneficiary[]; // Updated to be an array
  sendEmailToNextOfKin?: string;
  totalTripCost?: number;
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
  ticketUID: string | null; // Add ticketUID to store
  setTicketUID: (ticketUID: string) => void; // Method to update ticketUID
  bookingStatus: { ticket: string | null } | null; // Add bookingStatus
  setBookingStatus: (status: { ticket: string | null }) => void; // Method to set bookingStatus
  selectedTrip: TripData | null;
  setSelectedTrip: (trip: TripData) => void;
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
        fullName: "",
        email: "",
        phoneNumber: "",
        departureTerminal: "",
        arrivalTerminal: "",
        availableTrip: "",
        returnTrip: null,
        departureSeatNumbers: [],
        returnSeatNumbers: [],
        travellingWithAChild: false,
        child1Name: "",
        child1Age: "",
        child1Gender: "",
        child2Name: "",
        child2Age: "",
        child2Gender: "",
        nextOfKinName: "",
        nextOfKinPhoneNumber: "",
        nextOfKinEmail: "",
        beneficiaries: [], // Initialize as an empty array
        sendEmailToNextOfKin: "no",
        totalTripCost: 0,
      },
      setTripDetails: (details) => set({ tripDetails: details }),
      ticketUID: null, // Initialize as null
      setTicketUID: (ticketUID) => set({ ticketUID }), // Method to set ticketUID
      bookingStatus: null, // Initialize bookingStatus
      setBookingStatus: (status) => set({ bookingStatus: status }),
      selectedTrip: null,
      setSelectedTrip: (trip: TripData) => set({ selectedTrip: trip }),
    }),
    {
      name: "trip-store", // unique name for the storage key
      getStorage: () => localStorage, // (optional) default is localStorage
    }
  )
);

export default useStore;
