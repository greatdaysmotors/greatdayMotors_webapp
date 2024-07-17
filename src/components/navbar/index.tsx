import PrimaryBtn from "@components/button/PrimaryBtn";
import { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdClose,
  IoMdMenu,
} from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";
import { NavigationTypes } from "../../types/NavigationTypes";

const navlinks: NavigationTypes[] = [
  {
    id: 1,
    title: "Your Bookings",
    link: "/bookings",
  },
  {
    id: 2,
    title: "About Us",
    link: "/about-us",
  },
  {
    id: 3,
    title: "Logistics",
    link: "/logistics",
  },
  {
    id: 4,
    title: "Contact Us",
    link: "/contact-us",
  },
];

const NavBar = () => {
  // Retrieve the emailConfirmationToken from local storage
  const authToken =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userDetailsString =
    localStorage.getItem("userDetails") ||
    sessionStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center w-full px-[2.4rem] lg:px-[4.4rem] py-[1rem] h-[5rem] md:h-[7.2rem] lg:h-[8rem] shadow-sm">
      <Link to="/" className="flex gap-[0.4rem] items-center">
        <img
          src={logo}
          alt="logo"
          className="w-[3.2rem] h-[3rem] md:w-[4.2rem] md:h-[4rem]"
        />
        <h4 className="hidden lg:flex lg:text-[1.6rem] font-[700]">
          GREATDAY MOTORS
        </h4>
      </Link>

      <div className="md:hidden z-[100]">
        {open ? (
          <div onClick={toggleMenu} className="cursor-pointer">
            <IoMdClose color="#000" size={24} />
          </div>
        ) : (
          <div onClick={toggleMenu} className="cursor-pointer">
            <IoMdMenu size={24} />
          </div>
        )}
      </div>

      <div className="hidden md:flex">
        <ul className="flex gap-[1.6rem] lg:gap-[4.8rem] items-center">
          {navlinks.map((navlink) => (
            <Link key={navlink.id} to={navlink.link}>
              <li
                className={`md:text-[1.6rem] lg:text-[1.8rem] cursor-pointer font-[500] ${
                  isActive(navlink.link) ? "text-primaryColor" : ""
                }`}
              >
                {navlink.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div
        className={`${
          open
            ? "opacity-100 transition-all duration-500 ease-in-out"
            : "max-h-0 opacity-0 transition-all duration-500 ease-in-out"
        } shadow-sm pt-28 overflow-hidden flex flex-col text-center lg:hidden bg-white gap-4 absolute top-0 left-0 z-50 w-full p-6 mx-auto `}
      >
        <ul className="flex flex-col gap-[1.6rem] lg:gap-[4.8rem] items-center">
          {navlinks.map((navlink) => (
            <Link key={navlink.id} to={navlink.link}>
              <li
                className={`text-[1.8rem] cursor-pointer font-[500] ${
                  isActive(navlink.link) ? "text-primaryColor" : ""
                }`}
              >
                {navlink.title}
              </li>
            </Link>
          ))}
        </ul>

        {authToken ? (
          <>
            {" "}
            <div
              onClick={toggleDropdown}
              className="flex items-center justify-center md:hidden gap-[1.6rem] my-[1rem]"
            >
              <img src={logo} alt="logo" className="w-[4rem] h-[4rem]" />

              <div className="flex items-center gap-[1rem] cursor-pointer">
                <h3 className="text-[1.8rem] font-[600]">
                  {(userDetails && userDetails?.fullName) || "User fullName"}
                </h3>
                {isOpen ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </div>
            </div>
            {isOpen && (
              <ul className="flex flex-col gap-[1.6rem] items-center mb-10">
                <Link to="/profile">
                  {" "}
                  <li className="text-[1.8rem] font-[500]">Profile</li>
                </Link>
                <Link to="/change-password">
                  {" "}
                  <li className="text-[1.8rem] font-[500]">Change Password</li>
                </Link>
                <Link to="/bookings">
                  <li className="text-[1.8rem] font-[500]">Booking History</li>
                </Link>
                <Link to="/delete-account">
                  {" "}
                  <li className="text-[1.8rem] font-[500]">Delete Account</li>
                </Link>
                <Link to="/log-out">
                  <li className="text-[1.8rem] font-[500] text-red-600">
                    Logout
                  </li>
                </Link>
              </ul>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-[1.6rem]">
            <Link to="/signup">
              <PrimaryBtn className="bg-primaryColor w-[25rem] mx-auto  h-[38px] lg:h-[48px] flex justify-center items-center text-[#fff]">
                Sign Up
              </PrimaryBtn>
            </Link>
            <Link to="/login">
              <PrimaryBtn className="text-primaryColor w-[25rem] mx-auto border border-primaryColor  h-[38px] lg:h-[48px] flex justify-center items-center">
                Login
              </PrimaryBtn>
            </Link>
          </div>
        )}
      </div>

      {authToken ? (
        <Link
          to="/profile"
          className="hidden md:flex md:items-center md:gap-[1.6rem]"
        >
          <img src={logo} alt="logo" className="w-[5rem] h-[5rem]" />

          <h3 className="text-[1.8rem] font-[600]">
            {" "}
            {(userDetails && userDetails?.fullName) || "User fullName"}
          </h3>
        </Link>
      ) : (
        <div className="hidden md:flex md:items-center md:gap-[1.6rem]">
          <Link to="/signup">
            <PrimaryBtn className="bg-primaryColor w-[10rem] md:w-[14rem] h-[38px] lg:h-[48px] flex justify-center items-center text-[#fff]">
              Sign Up
            </PrimaryBtn>
          </Link>
          <Link to="/login">
            <PrimaryBtn className="text-primaryColor border border-primaryColor w-[10rem] md:w-[14rem] h-[38px] lg:h-[48px] flex justify-center items-center">
              Login
            </PrimaryBtn>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
