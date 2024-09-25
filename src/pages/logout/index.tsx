import React, { useEffect } from "react";
import MainLayout from "@layouts/MainLayout";
import Container from "@layouts/Container";
import bg from "../../../public/svgs/bgimagetrip.svg";
import useStore from "../../store"; 
import ProfilePage from "@components/Profile";
import ChangePassword from "@components/ChangePassword";
import DeleteAccount from "@components/DeleteAccount";
import BookingHistory from "@components/BookingHistory";
import LogOutPage from "@components/LogOut";
import SidebarMenu from "@components/sidebar";

const LogOut: React.FC = () => {
  const { selectedMenu, setSelectedMenu } = useStore();

  const renderContent = () => {
    switch (selectedMenu) {
      case "Profile":
        return <ProfilePage />;
      case "ChangePassword":
        return <ChangePassword />;
      case "BookingHistory":
        return <BookingHistory />;
      case "DeleteAccount":
        return <DeleteAccount />;
      case "Logout":
        return <LogOutPage />;
      default:
        return <LogOutPage />;
    }
  };

  useEffect(() => {
    setSelectedMenu("Logout");
  }, [setSelectedMenu]);

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
          <SidebarMenu
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
          <div className="flex flex-col pt-[2rem] pb-[4.3rem] md:pb-[6rem] my-[2.4rem] lg:my-[3rem] rounded-[1rem] bg-[#fff] p-[1.5rem] md:p-[4rem] md:w-[75%]">
            {renderContent()}
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default LogOut;
