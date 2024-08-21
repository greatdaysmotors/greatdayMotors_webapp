import Container from "@layouts/Container";
import MainLayout from "@layouts/MainLayout";
import comingsoon from "../../../public/pngs/logisticscoming.png";

const Logistics = () => {
  return (
    <MainLayout>
      <Container>
        <div className="flex flex-col w-full md:h-full relative lg:w-[80%] mx-auto">
          <div className="flex flex-col w-full items-center md:w-[47rem] lg:w-[47rem] justify-center absolute top-20 md:top-0 bottom-[50%] md:bottom-[60%] lg:bottom-[60%]">
            <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-[700] ">
              Coming Soon
            </h1>
            <p className="text-[1.6rem] text-center md:px-10 lg:px-0">
              We are currently working on creating our GreatDay Logistics
              website. We Will Be Launching Soon. Stay Tuned.
            </p>
          </div>
          <img src={comingsoon} alt="coming soon" className="mt-32 md:mt-0" />
        </div>
      </Container>
    </MainLayout>
  );
};

export default Logistics;
