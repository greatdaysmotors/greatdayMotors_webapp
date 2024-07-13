import React from "react";
import { Link } from "react-router-dom";

interface SidebarMenuProps {
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  selectedMenu,
  setSelectedMenu,
}) => {
  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu); // Directly setting the selected menu
  };

  return (
    <div className="hidden md:flex md:flex-col rounded-[1rem] md:w-[25%] bg-[#fff] my-[2.4rem] lg:my-[3rem] shadow-[0px_0px_10px_0px_#2222221A] h-[50vh]">
      <ul className="flex flex-col gap-[1rem]">
        <Link to="/profile">
          <li
            className={`py-[1rem] px-[2rem] cursor-pointer ${
              selectedMenu === "Profile" && "bg-primaryColor text-[#fff]"
            }`}
            onClick={() => handleMenuClick("Profile")}
          >
            Profile
          </li>
        </Link>

        <Link to="/change-password">
          <li
            className={`py-[1rem] px-[2rem] cursor-pointer ${
              selectedMenu === "ChangePassword" && "bg-primaryColor text-[#fff]"
            }`}
            onClick={() => handleMenuClick("ChangePassword")}
          >
            Change Password
          </li>
        </Link>
        <Link to="/bookings">
          <li
            className={`py-[1rem] px-[2rem] cursor-pointer ${
              selectedMenu === "BookingHistory" && "bg-primaryColor text-[#fff]"
            }`}
            onClick={() => handleMenuClick("BookingHistory")}
          >
            Booking History
          </li>
        </Link>
        <Link to="/delete-account">
          <li
            className={`py-[1rem] px-[2rem] cursor-pointer ${
              selectedMenu === "DeleteAccount" && "bg-primaryColor text-[#fff]"
            }`}
            onClick={() => handleMenuClick("DeleteAccount")}
          >
            Delete Account
          </li>
        </Link>
        <Link to="/log-out">
          <li
            className={`py-[1rem] px-[2rem] cursor-pointer ${
              selectedMenu === "Logout" && "bg-primaryColor text-[#fff]"
            }  font-[500]`}
            onClick={() => handleMenuClick("Logout")}
          >
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SidebarMenu;
