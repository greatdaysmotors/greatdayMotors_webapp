import { create } from "zustand";
import {  storeState } from "../types/Trip";






export const use_round_trip = create<storeState>((set) => ({
  trip_data: {
    departure_terminal: "",
    arrival_terminal: "",
    departure_date: "",
    arrival_date: "",
    number_of_adults: 1,
    number_of_children: 0,
  },
  set_trip_data: (data) => set({ trip_data: data }),
   round_trip_active: false,
   set_round_trip_active: (is_active) => set({ round_trip_active: is_active }),
   round_trip_post_data:{
    fullName:"",
    email:"",
    phoneNumber:"",
    departureTerminal: "",
    arrivalTerminal: "",
    availableTrip: "",
    returnTrip: "", 
    departureSeatNumbers: [],
    returnSeatNumbers: [], 
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
            phoneNumber: ""
        }
    ],
    sendEmailToNextOfKin: "no",
    totalTripCost: 0
},
set_round_trip_post_data:(data)=>set({round_trip_post_data:data}),
payment_ref_id:{
  ref_id:""
},
set_payment_ref_id:(data)=>set({payment_ref_id:data})
 }));





