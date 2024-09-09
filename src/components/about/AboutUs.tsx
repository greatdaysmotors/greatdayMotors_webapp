import aboutusimage from "../../../public/jpegs/aboutimge.jpg";

const AboutUsSection = () => {
  return (
    <div className="w-full  flex flex-col gap-[1.6rem]">
      <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[4rem] font-[700] text-center">
        About Us
      </h2>
      <p className="text-[1.4rem] lg:text-[1.6rem] font-[500] text-left leading-[2rem]">
        At <b className="text-[1.6rem]">Great Day Motors,</b> we are committed
        to redefining the transportation experience with unparalleled service,
        reliability, and innovation. Founded with the goal of providing
        exceptional transportation solutions, we have become a trusted name for
        individuals and businesses seeking dependable and efficient services.
      </p>
      <img
        src={aboutusimage}
        alt="about us image"
        className="h-auto object-contain"
      />
      <p className="text-[1.6rem] font-[500] text-left leading-[2rem]">
        <b className="text-[1.6rem]">Our diverse fleet,</b> which includes
        state-of-the-art vehicles and cutting-edge technology, allows us to meet
        a wide range of transportation needs. From daily commuting and corporate
        travel to logistics and long-distance freight, Great Day Motors ensures
        that each journey is handled with the utmost care and professionalism.
        <br />
        <br />
        <b className="text-[1.6rem]">
          Our dedicated team of professionals,
        </b>{" "}
        from drivers to customer service representatives, is focused on
        delivering a seamless and pleasant experience for every client. We
        continually invest in our people and technology to stay ahead of
        industry trends and provide the highest quality service.
      </p>
      <h3 className="text-[1.8rem] md:text-[2.8rem] font-[700] text-center">
        Key Services:
      </h3>
      <ul className="list-disc list-inside mt-4 space-y-2">
        <li className="text-[1.6rem] font-[500] text-left leading-[2rem]">
          Passenger transportation (local and long-distance)
        </li>
        <li className="text-[1.6rem] font-[500] text-left leading-[2rem]">
          Freight and logistics solutions
        </li>
        <li className="text-[1.6rem] font-[500] text-left leading-[2rem]">
          Corporate travel and event transportation
        </li>
        <li className="text-[1.6rem] font-[500] text-left leading-[2rem]">
          Customized transportation solutions for unique needs
        </li>
      </ul>
      <p className="text-[1.6rem] font-[500] text-left leading-[2rem] mt-4">
        With a strong commitment to safety, customer satisfaction, and
        environmental sustainability, <b>Great Day Motors</b> is your partner
        for reliable and efficient transportation.
      </p>
    </div>
  );
};

export default AboutUsSection;
