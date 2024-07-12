import React from "react";
import car from "../../../public/pngs/cartrip.png";

type TripProps = {
  imageSrc?: string;
  altText?: string;
  route: string;
  time: string;
  price: string;
};

const Trip: React.FC<TripProps> = ({
  imageSrc = car,
  altText = "car image",
  route,
  time,
  price,
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 10px 0px #22222240",
      }}
      className="px-[0.6rem] py-[1.2rem] md:py-[3rem] md:px-[2rem] lg:py-[3.5rem] lg:px-[3.5rem] rounded-[1rem] flex items-start gap-[1rem]"
    >
      <div className="flex w-full items-start gap-[0.2rem] md:gap-[0.8rem]">
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={altText}
            className="h-[2.4rem] lg:h-[4rem] w-auto"
          />
        </div>
        <div className="flex flex-col ">
          <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem] font-[700]">
            {route}
          </p>

          <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[2rem]  font-[500]">
            {time}
          </p>
        </div>
      </div>
      <div className=" flex flex-col justify-start items-start gap-[0.8rem] w-[20%] pr-20 md:pr-0">
        <h6 className="text-[1.4rem] md:text-[1.6rem] lg:text-[2rem]  font-[700]">
          {price}
        </h6>
      </div>
    </div>
  );
};

export default Trip;
