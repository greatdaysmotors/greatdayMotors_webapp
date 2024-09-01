import bgImage from "../../../public/svgs/gd_hero.png";
import BookTrip from "./BookTrip";

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center  bg-no-repeat flex flex-col items-center justify-center   lg:px-[4.4rem] lg:py-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col lg:flex-row  gap-[8rem] items-start   max-w-[1440px]">
        <div className="flex flex-col gap-[1.5rem] w-[80%] md:w-[55%] mx-auto mt-14 ">
          <h2 className="text-[2rem] font-[700] text-[#fff] text-center lg:text-[4rem] lg:text-left">
            Book Your Journey and Delight in Unforgettable Experiences
          </h2>
          <h4 className="text-[1.6rem] text-[#fff] text-center lg:text-[2.4rem] lg:text-left font-[400]">
            Book Your Seat Today and Set Off on Your Affordable Inter-City
            Adventure Today and Discover a World of Unparalleled Experiences
            Awaiting Your Exploration
          </h4>
        </div>
        <BookTrip />
      </div>
    </div>
  );
};

export default HeroSection;
