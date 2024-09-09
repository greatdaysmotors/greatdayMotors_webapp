import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";

const Footer = () => {
  const navigate = useNavigate();

  const handleCheckBookingStatus = () => {
    // Scroll to the top of the page
    document
      .getElementById("book-trip-tab")
      ?.scrollIntoView({ behavior: "smooth" });

    // Navigate to the BookTrip component if necessary
    navigate("/#book-trip");
  };

  const handleVision = () => {
    // Navigate to the About Us page
    navigate("/about-us", { state: { scrollTo: "vision" } });
  };

  return (
    <div className="bg-brandDark ">
      <div className="px-[2.4rem] lg:px-[4.4rem] py-[1.4rem] lg:py-[4.8rem] md:flex md:gap-[3rem]  lg:gap-[5rem]">
        <div className="md:w-[40%] lg:w-[50%]">
          <Link to="/" className="flex gap-[0.4rem] items-center">
            <img
              src={logo}
              alt="logo"
              className="w-[3.2rem] h-[3rem] md:w-[4.2rem] md:h-[4rem]"
            />
            <h4 className="text-[1.4rem] lg:text-[1.6rem]  font-[700] text-[#fff]">
              GREATDAY MOTORS
            </h4>
          </Link>
          <p className="text-[1.2rem] lg:text-[1.4rem] font-[500] mt-[0.8rem] text-[#fff]">
            We are dedicated to providing reliable and efficient transportation
            services across Nigeria. With a robust network of modern terminals
            strategically located in key cities and regions, we ensure that
            travel is convenient and accessible for all passengers. We are
            committed to our customer safety, security, and satisfaction, we
            strive to make every journey a smooth and enjoyable experience.
          </p>
        </div>
        <div className="mt-[2.7rem] lg:mt-[1rem] grid grid-cols-2 md:grid-cols-4 gap-[2.5rem] md:gap-[rem] md:w-[60%] lg:w-[50%]">
          <div className="flex flex-col gap-[0.8rem]">
            <p className="text-[1.4rem] lg:text-[1.6rem]  font-[700] text-[#fff]">
              Quick Links
            </p>
            <ul className="flex flex-col gap-[0.8rem]">
              <Link
                to="/book-ticket"
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                Book Ticket
              </Link>
              <Link
                to="/hire-service"
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                Hire Service
              </Link>
              <Link
                to="/reshedule-ticket"
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                Reshedule Ticket
              </Link>
              <li
                onClick={handleCheckBookingStatus}
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                Check Booking Status
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <p className="text-[1.4rem] lg:text-[1.6rem]  font-[700] text-[#fff]">
              Your Bookings
            </p>
            {/* <ul className="flex flex-col gap-[0.8rem]">
              <li className="text-[1.2rem] lg:text-[1.4rem] font-[500] text-[#fff]">
                Bookings 1
              </li>
              <li className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff]">
                Bookings 2
              </li>
            </ul> */}
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <p className="text-[1.4rem] lg:text-[1.6rem]  font-[700] text-[#fff]">
              Company
            </p>
            <ul className="flex flex-col gap-[0.8rem]">
              <Link
                to="/about-us"
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                About Us
              </Link>
              <li
                onClick={handleVision}
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                Our Vision
              </li>
              <Link
                to="/contact-us"
                className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff] cursor-pointer"
              >
                Contact Us
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <p className="text-[1.4rem] lg:text-[1.6rem]  font-[700] text-[#fff]">
              Logistics
            </p>
            {/* <ul className="flex flex-col gap-[0.8rem]">
              <li className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff]">
                Logistics 1
              </li>
              <li className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff]">
                Logistics 2
              </li>
              <li className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff]">
                Logistics 3
              </li>
              <li className="text-[1.2rem] lg:text-[1.4rem]  font-[500] text-[#fff]">
                Logistics 4
              </li>
            </ul> */}
          </div>
        </div>
      </div>
      <hr />
      <div className="px-[2.4rem] lg:px-[4.4rem] py-[0.8rem] md:py-[1.2rem] flex gap-[22px] justify-end w-full">
        <div className="flex items-center justify-between lg:justify-end gap-6  md:gap-[0.8rem] w-full">
          <Link
            to="/terms-and-conditions"
            className="text-[#fff] text-[1.2rem] lg:text-[1.6rem] font-[500] cursor-pointer"
          >
            Terms and Conditions
          </Link>
          <p className="text-[#fff]">|</p>
          <Link
            to="/privacy-policy"
            className="text-[#fff] text-[1.2rem] lg:text-[1.6rem] font-[500] cursor-pointer "
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center gap-[0.4rem] md:gap-[2.4rem]">
          <div className="h-[3.5rem] w-[3.5rem] border-[0.1rem] rounded-full border-[#fff] flex items-center justify-center cursor-pointer">
            <FiFacebook size={20} color="#fff" />
          </div>
          <div className="h-[3.5rem] w-[3.5rem] border-[0.1rem] rounded-full border-[#fff] flex items-center justify-center cursor-pointer">
            <FiInstagram size={20} color="#fff" />
          </div>
          <div className="h-[3.5rem] w-[3.5rem] border-[0.1rem] rounded-full border-[#fff] flex items-center justify-center cursor-pointer">
            <FaXTwitter size={20} color="#fff" />
          </div>
          <div className="h-[3.5rem] w-[3.5rem] border-[0.1rem] rounded-full border-[#fff] flex items-center justify-center cursor-pointer">
            <AiOutlineYoutube size={20} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
