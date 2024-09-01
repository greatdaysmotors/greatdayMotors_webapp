
export interface Seat {
  seatNumber: number;
  seatStatus: string;
  ticketId: string;
  userId: string;
}

export interface Driver {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  gender: string;
  hasVehicle: boolean;
  isANewStaff: boolean;
  isANweStaff: boolean;
  accountStatus: string;
  address: string;
}

export interface Terminal {
  terminalAddress: string;
  terminalLGA: string;
  terminalName: string;
  terminalState: string;
}

export interface Vehicle {
  _id: string;
  vehicleName: string;
  vehicleNumber: string;
  vehicleType: string;
  numberOfSeats: number;
  createdAt: string;
  updatedAt: string;
  driver: string;
}

export interface TripData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  departureDateTime: string;
  tripCost: number;
  tripStatus: string;
  seatsAvailable: number;
  seatsAndStatus: Seat[];
  from: Terminal;
  to: Terminal;
  vehicle: Vehicle;
  driver: Driver;
}

export interface round_trip_form_data {
  departure_terminal: string ;
  arrival_terminal: string ;
  departure_date: string ;
  arrival_date: string ;
  number_of_adults: number;
  number_of_children: number;
}

export interface storeState {
  trip_data: round_trip_form_data;
  set_trip_data: (data: round_trip_form_data) => void;
  round_trip_active: boolean;
  set_round_trip_active: (is_active: boolean)=> void;
  round_trip_post_data:round_trip_post_data_type;
  set_round_trip_post_data:(is_active: round_trip_post_data_type)=> void;
}

interface   beneficiaries {
  name: string,
  email: string,
  phoneNumber: string
}



export interface round_trip_post_data_type{
  departureTerminal: string,
  arrivalTerminal: string,
  availableTrip:string,
  returnTrip:string, 
  departureSeatNumbers: number[],
  returnSeatNumbers: number[], 
  travellingWithAChild: string,
  child1Name: string,
  child1Age: string,
  child1Gender: string,
  child2Name: string,
  child2Age: string,
  child2Gender: string,
  nextOfKinName: string | undefined,
  nextOfKinPhoneNumber: string | undefined,
  nextOfKinEmail: string | undefined,
  bneficiaries: beneficiaries[],
  sendEmailToNextOfKin: "yes" | "no",
  totalTripCost: number
}



export interface art_from_to {
  _id:string,
  terminalName:string,
  terminalAddress:string,
  terminalLGA:string,
  terminalState:string,
  __v:number
}

export interface art_driver {
  _id:string,
  fullName:string,
  email:string,
  photoURL:string
  phoneNumber:string,
  accountStatus:string,
  address:string,
  gender:string,
  hasVehicle:true,
  role:string,
  deleted:false,
  __v:0
}



export interface art_vehicle {
  _id:string,
  vehicleNumber:string,
  vehicleType:string,
  vehicleName:string,
  numberOfSeats:number,
  driver:string,
  createdAt:string,
  updatedAt:string,
  __v:number

}

export interface art_seats{
  seatNumber:number,
  seatStatus:string,
  ticketId:string,
  userId:string
}


export interface availTrips_returnTrips_type {
  _id:string,
  from:art_from_to,
  to:art_from_to,
  departureDateTime:string,
  tripCost:number,
  tripStatus:string,
  seatsAvailable:number,
  driver:art_driver,
  vehicle:art_vehicle,
  seatsAndStatus:art_seats[],
  createdAt:string,
  updatedAt:string,
  __v:number
}

export interface TripData_v1 {
  availableTrips:availTrips_returnTrips_type[],
  returnTrips:availTrips_returnTrips_type[],
}

