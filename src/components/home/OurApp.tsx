import playstoreimage from "../../../public/pngs/playstore.png";
import appleimage from "../../../public/pngs/apple.png";
import appimages from "../../../public/appimage.svg";
import Container from "@layouts/Container";

const OurApp = () => {
  return (
    <div className="py-[7rem] bg-[#171764] w-full">
      <Container>
        <div className="w-[31.4rem] md:w-[55rem] lg:w-[85%] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-[1.6rem] lg:w-[48.9rem] ">
            <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[3.2rem] font-[700] text-[#fff] text-center lg:text-left">
              Enhance Your Travel Experience and Download Our App Today for
              Effortless Booking
            </h2>
            <div className="flex w-[100%] mx-auto gap-[1rem] justify-center lg:justify-start">
              <div className="flex gap-[0.5rem] p-[0.7rem] items-center bg-[#000] rounded-[1rem] cursor-pointer">
                <p className="text-[#fff] text-[1.1rem]">Get It on AppStore</p>
                <img src={appleimage} alt="apple image" />
              </div>
              <div className="flex gap-[0.5rem] p-[0.7rem] items-center bg-[#000] rounded-[1rem] cursor-pointer">
                <p className="text-[#fff] text-[1.1rem]">
                  Download On Playstore
                </p>
                <img src={playstoreimage} alt="apple image" />
              </div>
            </div>
          </div>
          <div className="mt-[3.4rem] flex justify-center lg:h-[50rem] ">
            <img src={appimages} alt="app images"  className="w-auto max-w-full h-auto object-contain"/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurApp;
