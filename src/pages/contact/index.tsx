import PrimaryBtn from "@components/button/PrimaryBtn";
import Input from "@components/input";
import Container from "@layouts/Container";
import MainLayout from "@layouts/MainLayout";
import { useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const ContactUs = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <MainLayout>
      <Container>
        <div className="w-full flex flex-col gap-[0.4rem] py-[1.6rem] mb-[5rem]">
          <h2 className="text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-[700] text-center">
            Contact Us
          </h2>
          <p className="text-[1.6rem] font-[500] text-center leading-[2rem] lg:w-[80rem] lg:mx-auto">
            We value your feedback and are here to assist you with any inquiries
            or concerns. Please reach out to us through one of the following
            methods, and our dedicated team will respond to you promptly.
          </p>
          <div className="flex flex-col md:flex-row md:gap-[2.4rem] lg:gap-[8rem] md:mt-[4.8rem] lg:w-[70%] lg:mx-auto">
            <div className="p-[4rem] bg-primaryColor text-[#fff] mt-[2rem]">
              <h3 className="text-[2.4rem] font-[700]">Get In Touch</h3>
              <div className="flex items-start gap-[0.8rem] mt-[2.4rem]">
                <div>
                  <CiMail size={24} />
                </div>
                <div className="flex flex-col gap-[0.4rem]">
                  <h5 className="text-[1.8rem] font-[700]">Email</h5>
                  <p className="text-[1.6rem]">info@greatdaymotors.com</p>
                </div>
              </div>
              <div className="flex items-start gap-[0.8rem] mt-[2.4rem]">
                <div>
                  <FiPhone size={24} />
                </div>
                <div className="flex flex-col gap-[0.4rem]">
                  <h5 className="text-[1.8rem] font-[700]">Phone</h5>
                  <p className="text-[1.6rem]">+2347081036103</p>
                </div>
              </div>
            </div>
            <form
              action=""
              className="mt-[3.3rem] md:mt-0 md:pt-4 flex flex-col gap-[1rem] w-full "
            >
              <h2 className="text-[2rem] md:text-[2.4rem] font-[700] text-left">
                Send Us a Message
              </h2>
              <div className="flex flex-col gap-[2.4rem]">
                <Input
                  type="text"
                  placeholder="Name"
                  className="bg-[#e6e6e6] border border-[#999999]"
                />

                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-[#e6e6e6] border border-[#999999]"
                />

                <textarea
                  cols={5}
                  rows={5}
                  name="message"
                  id="message"
                  className="p-[0.8rem] border outline-none rounded-[1rem] text-[#000] bg-[#e6e6e6] border-[#999999]"
                  placeholder="Message"
                ></textarea>
                
                <PrimaryBtn className="bg-primaryColor text-[#fff]">
                  Contact Us
                </PrimaryBtn>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default ContactUs;
