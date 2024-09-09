import MainLayout from "@layouts/MainLayout";
import bg from "../../../public/svgs/bgimagetrip.svg";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import SupportCard from "@components/servicecard";
import { CiMail } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

const HireService = () => {
  // Define event handlers for different support options
  const handleCallSupport = () => {
    window.open("tel:09036600374");
  };

  const handleEmailSupport = () => {
    window.open("mailto:greatdaymotors@gmail.com");
  };

  const handleWhatsAppSupport = () => {
    const whatsappNumber = "+2349036600374";
    const message = "Hello! I'd like to Hire a Service.";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

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
              Hire Service
            </h2>

            <p
              className={` text-[1.4rem]  md:text-[2rem]  text-center font-[500]`}
            >
              Interested in hiring our services? Reach out to customer care for
              assistance.
            </p>
            
            <SupportCard
              title="Call Customer Support"
              phoneNumber="09036600374"
              icon={MdOutlinePhoneInTalk}
              iconStyles={{ backgroundColor: "#e0e0e0" }}
              titleStyles={{ color: "#333" }}
              phoneNumberStyles={{ color: "#666" }}
              onClick={handleCallSupport} // Pass the phone support handler
            />
            
            <SupportCard
              title="Email Customer Support"
              phoneNumber="greatdaymotors@gmail.com"
              icon={CiMail}
              iconStyles={{ backgroundColor: "#e0e0e0" }}
              titleStyles={{ color: "#333" }}
              phoneNumberStyles={{ color: "#666" }}
              onClick={handleEmailSupport} // Pass the email support handler
            />
            
            <SupportCard
              title="Chat With Customer Support"
              phoneNumber="09036600374"
              icon={TbBrandWhatsapp}
              iconStyles={{ backgroundColor: "#e0e0e0" }}
              titleStyles={{ color: "#333" }}
              phoneNumberStyles={{ color: "#666" }}
              onClick={handleWhatsAppSupport} // Pass the WhatsApp support handler
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HireService;
