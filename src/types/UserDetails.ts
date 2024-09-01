export interface UserDetails {
  name1: string;
  email1: string;
  phone1: string;
  name2: string;
  email2: string;
  phone2: string;
  // name3: string;
  // email3: string;
  // phone3: string;
}

export interface profile {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  gender: string;
  isDeleted: boolean;
  isOnline: boolean;
  nokEmail: string;
  nokFullName: string;
  nokPhoneNumber: string;
  phoneNumber: string;
  photoURL: string;
  registerStatus: string;
  status: string;
  updatedAt: string;
  __v: 0;
  _id: string;
}

export interface profile_fullName {
  fullName: string;
}
export interface profile_nokEmail {
  nokEmail: string;
}
export interface profile_nokFullName {
  nokFullName: string;
}
export interface profile_nokPhoneNumber {
  nokPhoneNumber: string;
}
export interface profile_phoneNumber {
  phoneNumber: string;
}
