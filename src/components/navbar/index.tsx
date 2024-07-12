import PrimaryBtn from "@components/button/PrimaryBtn";
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

interface NavigationTypes {
  id: number;
  title: string;
  link: string;
}

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
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center w-full px-[2.4rem] lg:px-[4.4rem] py-[1rem] h-[5rem] md:h-[7.2rem] lg:h-[8rem] shadow-sm">
      <Link to="/" className="flex gap-[0.4rem] items-center">
        <img
          src="../../../public/svgs/gd_logo.svg"
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
        } h-[43rem] pt-28 overflow-hidden flex flex-col text-center lg:hidden bg-white gap-4 absolute top-0 left-0 z-50 w-full p-6 mx-auto `}
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
      </div>

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
    </div>
  );
};

export default NavBar;
