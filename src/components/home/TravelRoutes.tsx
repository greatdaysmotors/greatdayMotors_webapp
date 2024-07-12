import Container from "@layouts/Container";
import routesimage from "../../../public/pngs/travel_img1.png";
import routesimag2 from "../../../public/pngs/traveiimg2.png";

const TravelRoutes = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full py-[2.4rem] md:py-[4rem]  lg:py-[8rem]">
        <p className="text-[1.2rem] lg:text-[1.4rem] text-primaryColor font-[700]">
          Our Routes
        </p>
        <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[3.2rem] font-[700] text-brandBlack text-center lg:text-left">
          Check Out Our Popular Travel Routes
        </h2>
        <div className="w-full  mt-[2rem] flex justify-center items-center">
          <div className="flex md:flex-wrap gap-[1.6rem] scroll-container overflow-scroll w-[100%] ">
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[20.6rem] md:h-[20rem] lg:w-[36.3rem] lg:h-[35rem] 2xl:w-[37rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimage}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover "
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] cursor-pointer">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[16rem] md:h-[20rem] lg:w-[22.9rem] lg:h-[35rem] 2xl:w-[30rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimag2}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[20.6rem] md:h-[20rem] lg:w-[36.3rem] lg:h-[35rem] 2xl:w-[37rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimage}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem] ">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[16rem] md:h-[20rem] lg:w-[22.9rem] lg:h-[35rem] 2xl:w-[30rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimag2}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[16rem] md:h-[20rem] lg:w-[22.9rem] lg:h-[35rem] 2xl:w-[30rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimag2}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[20.6rem] md:h-[20rem] lg:w-[36.3rem] lg:h-[35rem] 2xl:w-[37rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimage}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[16rem] md:h-[20rem] lg:w-[22.9rem] lg:h-[35rem] 2xl:w-[30rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimag2}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Lagos --&gt; Abuja
              </p>
            </div>
            <div className="relative w-[16.8rem] h-[12.8rem] md:w-[20.6rem] md:h-[20rem] lg:w-[36.3rem] lg:h-[35rem] 2xl:w-[37rem] 2xl:h-[35rem] flex-shrink-0 cursor-pointer">
              <img
                src={routesimage}
                alt="travel route image"
                className="w-full h-full rounded-[0.8rem] object-cover"
              />
              <p className="absolute bottom-2 md:bottom-4 lg:bottom-6 left-2 md:left-4 lg:left-6 px-[1rem] py-[0.5rem] rounded-[0.8rem] text-center bg-opacity-75 bg-black text-white text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Lagos --&gt; Abuja
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TravelRoutes;
