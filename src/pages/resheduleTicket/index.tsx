import MainLayout from "@layouts/MainLayout";
import bg from "../../../public/svgs/bgimagetrip.svg";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import SupportCard from "@components/servicecard";
import { CiMail } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

const ResheduleTicket = () => {
  return (
    <MainLayout>
      <div className="bg-[#e6e6e6] pb-16">
        <div className="relative w-full">
          <img
            src={bg}
            alt="background image"
            className="h-[19.2rem] md:h-[24rem] object-cover w-full"
          />
          <div
            className={`bg-[#fff]  rounded-t-[4rem] py-[2.5rem] px-[2.3rem]  md:w-[550px] md:mx-auto md:py-[4rem]  -mt-60 lg:mt-[-14rem] relative z-10 rounded-[2rem]`}
          >
            <h2
              className={` text-[1.8rem]  md:text-[3.2rem]  text-center font-[700]`}
            >
              Reschedule Ticket
            </h2>

            <p
              className={` text-[1.4rem]  md:text-[2rem]  text-center font-[500]`}
            >
              Interest in rescheduling your reservation booking?Reach out to
              customer care for assistance
            </p>
            <SupportCard
              title="Call Customer Support"
              phoneNumber="09036600374"
              icon={MdOutlinePhoneInTalk}
              iconStyles={{ backgroundColor: "#e0e0e0" }}
              titleStyles={{ color: "#333" }}
              phoneNumberStyles={{ color: "#666" }}
            />
            <SupportCard
              title="Email Customer Support"
              phoneNumber="greatdaymotors@gmail.com"
              icon={CiMail}
              iconStyles={{ backgroundColor: "#e0e0e0" }}
              titleStyles={{ color: "#333" }}
              phoneNumberStyles={{ color: "#666" }}
            />
            <SupportCard
              title="Chat With Customer Support"
              phoneNumber="09036600374"
              icon={TbBrandWhatsapp}
              iconStyles={{ backgroundColor: "#e0e0e0" }}
              titleStyles={{ color: "#333" }}
              phoneNumberStyles={{ color: "#666" }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResheduleTicket;
