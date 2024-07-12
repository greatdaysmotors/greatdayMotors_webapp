import React from "react";
import car from "../../../public/pngs/cartrip.png";

type SelectTripProps = {
  imageSrc?: string;
  altText?: string;
  route: string;
  carModel: string;
  seatsAvailable: number;
  departureTime: string;
  price: string;
  onSelectSeat: () => void;
};

const SelectTrip: React.FC<SelectTripProps> = ({
  imageSrc = car,
  altText = "car image",
  route,
  carModel,
  seatsAvailable,
  departureTime,
  price,
  onSelectSeat,
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 10px 0px #22222240",
      }}
      className="px-[0.6rem] py-[1.2rem] md:py-[3rem] md:px-[2rem] lg:py-[3.5rem] lg:px-[3.5rem] rounded-[1rem] flex items-start lg:items-center"
    >
      <div className="w-[40%] flex justify-center">
        <img
          src={imageSrc}
          alt={altText}
          className="md:w-[10rem] lg:w-[16rem] h-auto w-auto "
        />
      </div>
      <div className="flex flex-col w-[60%]">
        <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem] font-[700]">
          {route}
        </p>
        <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem]  font-[500]">
          {carModel}
        </p>
        <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem]  font-[500]">
          {seatsAvailable} Seats Available
        </p>
        <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem]  font-[500]">
          {departureTime}
        </p>
      </div>
      <div className="w-[11.5rem] lg:w-[14rem] flex flex-col justify-start items-start gap-[0.8rem]">
        <h6 className="text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem]  font-[700]">
          {price}
        </h6>
        <button
          onClick={onSelectSeat}
          className="bg-primaryColor text-[#fff] py-4 text-[1.2rem] lg:text-[1.6rem]  font-[500] rounded-[1rem] w-full"
        >
          Select Seat
        </button>
      </div>
    </div>
  );
};

export default SelectTrip;
