import { useEffect } from "react";
import visionimage from "../../../public/pngs/visionimg.png";
import { useLocation } from "react-router-dom";

const OurVisionSection = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div
      id="vision"
      className="w-full  flex flex-col md:flex-row gap-[1.6rem] md:items-center  lg:w-[90%] lg:mx-auto lg:gap-[10rem] my-[4rem]"
    >
      <div className=" flex flex-col gap-[1.6rem] md:items-start">
        <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[4rem] font-[700] text-center">
          Our Vision
        </h2>
        <p className="text-[1.6rem] font-[500] text-left leading-[2rem] hidden md:flex">
          At Great Day Motors, our vision is to lead the transportation industry
          by setting new benchmarks for safety, innovation, and customer
          service. We aspire to be the premier choice for individuals and
          businesses looking for seamless, eco-friendly, and cutting-edge
          transportation solutions.
        </p>
      </div>
      <img
        src={visionimage}
        alt="our vision image"
        className="h-auto object-contain w-[70%] md:w-[45%] lg:w-[50%] 2xl:w-full mx-auto"
      />
      <p className="text-[1.6rem] lg:text-[1.8rem] font-[500] text-left leading-[2rem] md:hidden">
        At Great Day Motors, our vision is to lead the transportation industry
        by setting new benchmarks for safety, innovation, and customer service.
        We aspire to be the premier choice for individuals and businesses
        looking for seamless, eco-friendly, and cutting-edge transportation
        solutions.
      </p>
    </div>
  );
};

export default OurVisionSection;
