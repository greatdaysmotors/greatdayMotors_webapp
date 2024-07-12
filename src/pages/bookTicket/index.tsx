import MainLayout from "@layouts/MainLayout";
import bg from "../../../public/svgs/bgimagetrip.svg";
import BookTrip from "@components/home/BookTrip";

const BookTicket = () => {
  return (
    <MainLayout>
      <div className="bg-[#e6e6e6] pb-16">
        <div className="relative w-full">
          <img
            src={bg}
            alt="background image"
            className="h-[19.2rem] md:h-[24rem] object-cover w-full"
          />
          <BookTrip className="w-[95%] mx-auto -mt-60 lg:mt-[-14rem] relative z-10 rounded-[2rem]" />
        </div>
      </div>
    </MainLayout>
  );
};

export default BookTicket;
