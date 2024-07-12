import directionicon from "../../../public/pngs/drn.svg";
import Trip from "./Trip";

const CompletedTrips = () => {
  return (
    <div  className="md:mt-[1rem] lg:mt-[2rem] flex flex-col gap-[2.4rem]">
      <Trip
        imageSrc={directionicon}
        altText={"direction icon"}
        route={"Uyo Terminal ==> Oshodi Terminal"}
        time={"April 30th 11:50"}
        price={"₦18,200"}
      />
      <Trip
        imageSrc={directionicon}
        altText={"direction icon"}
        route={"Uyo Terminal ==> Oshodi Terminal"}
        time={"April 30th 11:50"}
        price={"₦18,200"}
      />
    </div>
  );
};

export default CompletedTrips;
