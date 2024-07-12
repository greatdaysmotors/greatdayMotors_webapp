import React from "react";
import { RiArrowRightWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";

interface OfferCardProps {
  offerimg: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offerimg,
  title,
  description,
  link,
  className,
}) => {
  return (
    <div
      className={`mt-[1.6rem] flex flex-col gap-[0.8rem] w-full ${className}`}
    >
      <Link to={link}>
        <img
          src={offerimg}
          alt="what we offer image"
          className="cursor-pointer w-full"
        />
      </Link>
      <div className="flex items-center md:gap-[2rem]">
        <div className="w-[27.5rem] md:w-full flex flex-col gap-[0.8rem] ">
          <h3 className="text-[1.8rem] md:text-[2rem] font-[700]">{title}</h3>
          <h4 className="text-[1.6rem] font-[500]">{description}</h4>
        </div>
        <Link to={link}>
          <a className="p-[0.5rem] bg-primaryColor rounded-full flex items-center justify-center cursor-pointer">
            <RiArrowRightWideLine size={25} color="#fff" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;
