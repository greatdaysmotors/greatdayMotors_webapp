import BookingHistory from "@components/bookings/BookingHistory";
import ChangePassword from "@components/bookings/ChangePassword";
import DeleteAccount from "@components/bookings/DeleteAccount";
import EditProfile from "@components/bookings/EditProfile";
import Container from "@layouts/Container";
import MainLayout from "@layouts/MainLayout";
import { useState } from "react";
import bg from "../../../public/svgs/bgimagetrip.svg";

const Bookings = () => {
  const [selectedMenu, setSelectedMenu] = useState("BookingHistory");

  const renderContent = () => {
    switch (selectedMenu) {
      case "EditProfile":
        return <EditProfile />;
      case "ChangePassword":
        return <ChangePassword />;
      case "BookingHistory":
        return <BookingHistory />;
      case "DeleteAccount":
        return <DeleteAccount />;
      case "Logout":
        return "Logout";
      default:
        return <BookingHistory />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-[#e6e6e6]">
        <div className="z-20 w-full">
          <img
            src={bg}
            alt="background image"
            className="h-[19.2rem] md:h-[24rem] object-cover w-full"
          />
        </div>
        <Container className="flex flex-col md:flex-row md:gap-[2.4rem] lg:w-[80%] md:items-start">
          <div className="hidden md:flex md:flex-col rounded-[1rem] md:w-[25%] bg-[#fff] my-[2.4rem] lg:my-[3rem] shadow-[0px_0px_10px_0px_#2222221A] h-[50vh]">
            <ul className="flex flex-col gap-[1rem]">
              <li
                className={`py-[1rem] px-[2rem] cursor-pointer ${
                  selectedMenu === "EditProfile" &&
                  "bg-primaryColor text-[#fff]"
                }`}
                onClick={() => setSelectedMenu("EditProfile")}
              >
                Edit Profile
              </li>
              <li
                className={`py-[1rem] px-[2rem] cursor-pointer ${
                  selectedMenu === "ChangePassword" &&
                  "bg-primaryColor text-[#fff]"
                }`}
                onClick={() => setSelectedMenu("ChangePassword")}
              >
                Change Password
              </li>
              <li
                className={`py-[1rem] px-[2rem] cursor-pointer ${
                  selectedMenu === "BookingHistory" &&
                  "bg-primaryColor text-[#fff]"
                }`}
                onClick={() => setSelectedMenu("BookingHistory")}
              >
                Booking History
              </li>
              <li
                className={`py-[1rem] px-[2rem] cursor-pointer ${
                  selectedMenu === "DeleteAccount" &&
                  "bg-primaryColor text-[#fff]"
                }`}
                onClick={() => setSelectedMenu("DeleteAccount")}
              >
                Delete Account
              </li>
              <li
                className={`py-[1rem] px-[2rem] cursor-pointer text-red-600 font-[500]`}
                onClick={() => setSelectedMenu("Logout")}
              >
                Logout
              </li>
            </ul>
          </div>
          <div className="flex flex-col pt-[2rem] pb-[4.3rem] md:pb-[6rem] my-[2.4rem] lg:my-[3rem] rounded-[1rem] bg-[#fff] p-[1.5rem] md:p-[4rem] md:w-[75%] ">
            {renderContent()}
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Bookings;
