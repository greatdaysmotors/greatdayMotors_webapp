
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
