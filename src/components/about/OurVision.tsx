import visionimage from "../../../public/pngs/visionimg.png";

const OurVisionSection = () => {
  return (
    <div className="w-full  flex flex-col md:flex-row gap-[1.6rem] md:items-center  lg:w-[90%] lg:mx-auto lg:gap-[10rem] my-[4rem]">
      <div className=" flex flex-col gap-[1.6rem] md:items-start">
        <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[4rem] font-[700] text-center">
          Our Vision
        </h2>
        <p className="text-[1.6rem] font-[500] text-left leading-[2rem] hidden md:flex">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
          commodo libero. Sed interdum lorem non libero aliquet, nec fermentum
          libero consequat. Integer porta, leo nec aliquam sodales, dui dolor
          viverra justo, id vehicula ipsum nulla at nulla. Aliquam posuere ex et
          elit fermentum, sed pharetra libero eleifend. Integer non nisl eget
          nunc malesuada malesuada.
        </p>
      </div>
      <img
        src={visionimage}
        alt="our vision image"
        className="h-auto object-contain w-[70%] md:w-[45%] lg:w-[50%] 2xl:w-full mx-auto"
      />
      <p className="text-[1.6rem] lg:text-[1.8rem] font-[500] text-left leading-[2rem] md:hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
        commodo libero. Sed interdum lorem non libero aliquet, nec fermentum
        libero consequat. Integer porta, leo nec aliquam sodales, dui dolor
        viverra justo, id vehicula ipsum nulla at nulla. Aliquam posuere ex et
        elit fermentum, sed pharetra libero eleifend. Integer non nisl eget nunc
        malesuada malesuada.
      </p>
    </div>
  );
};

export default OurVisionSection;
