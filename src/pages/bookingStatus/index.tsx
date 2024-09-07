import MainLayout from "@layouts/MainLayout";
import { Link } from "react-router-dom";
import bg from "../../../public/svgs/bgimagetrip.svg";
import useStore from "../../store";
import dayjs from "dayjs";

// Define the correct type for `ticket`
interface Ticket {
  departureTerminal: {
    terminalName: string;
  };
  arrivalTerminal: {
    terminalName: string;
  };
  totalTripCost: number;
  availableTrip?: {
    departureDateTime?: string;
  };
  ticketPaymentStatus: string;
}

// Define `bookingStatus` type
interface BookingStatus {
  ticket: Ticket | null;
}

const BookingStatus: React.FC = () => {
  const { bookingStatus } = useStore((state) => ({
    bookingStatus: state.bookingStatus as BookingStatus, // Ensure the correct type
  }));
  console.log("bookingStatus", bookingStatus);

  const departureDateTime =
    bookingStatus?.ticket?.availableTrip?.departureDateTime;

  const formattedDate = departureDateTime
    ? dayjs(departureDateTime).format("DD/MM/YYYY hh:mm A")
    : "N/A";

  return (
    <MainLayout>
      <div className=" bg-[#e6e6e6] pb-20 relative">
        <div className="z-20 w-full">
          <img
            src={bg}
            alt="background image"
            className=" h-[19.2rem] md:h-[24rem] object-cover w-full"
          />
        </div>

        <div
          className="px-[2.4rem] md:px-[6.4rem] lg:px-[10rem] lg:max-w-[1440px] lg:mx-auto z-20 -mt-[16rem] relative 
       "
        >
          <div className="flex flex-col gap-[1rem] bg-[#fff] h-[33rem] md:h-[38rem] p-[3.2rem] rounded-[1rem] lg:w-[59rem] lg:mx-auto">
            <p className="flex items-center gap-2 text-brandGray">
              <Link to="/" className="text-[1.4rem]">
                Home
              </Link>{" "}
              &gt;`{" "}
              <span className="text-[1.4rem] font-[600]">Booking Status</span>
            </p>
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-[700] mt-[2rem]">
              Booking Status
            </h2>
            <div className="flex justify-between">
              <p className="text-[1.4rem] md:text-[1.8rem] ">
                Departure Terminal
              </p>
              <p className="text-[1.4rem] md:text-[1.8rem] font-[600]">
                {bookingStatus?.ticket?.departureTerminal?.terminalName ||
                  "N/A"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[1.4rem] md:text-[1.8rem] ">
                Arrival Terminal
              </p>
              <p className="text-[1.4rem] md:text-[1.8rem] font-[600]">
                {bookingStatus?.ticket?.arrivalTerminal.terminalName || "N/A"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[1.4rem] md:text-[1.8rem] ">Ticket Price</p>
              <p className="text-[1.4rem] md:text-[1.8rem] font-[600]">
                ₦
                {bookingStatus?.ticket?.totalTripCost.toLocaleString() || "N/A"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[1.4rem] md:text-[1.8rem] ">Departure Date</p>
              <p className="text-[1.4rem] md:text-[1.8rem] font-[600]">
                {formattedDate || "N/A"}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-[1.4rem] md:text-[1.8rem] ">Booking Status</p>
              <p className="text-[1.4rem] capitalize md:text-[1.8rem] font-[600]">
                {" "}
                {bookingStatus?.ticket?.ticketPaymentStatus || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingStatus;
