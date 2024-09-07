import Input from "@components/input";
import { Button, Radio, Spin, Tabs } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useState } from "react";
import { Link } from "react-router-dom";
import { use_round_trip } from "../../store/round_trip";
import { storeState } from "../../types/Trip";
import OneWayTrip from "./OneWayTrip";
import RoundTrip from "./RoundTrip";
// import { useBookingStatus } from "@hooks/useBookingStatus";
import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useStore from "../../store";

// Define the types for the booking status and its ticket
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

interface BookingStatus {
  ticket: Ticket | null;
}

// Define `BookTripProps` interface
interface BookTripProps {
  className?: string;
}

const BookTrip: React.FC<BookTripProps> = ({ className }) => {
  // const T_UID = useStore((state) => state.ticketUID);
  const userToken = useAuthToken();

  const is_round_trip_tab_active = use_round_trip(
    (state: storeState) => state.round_trip_active
  );

  const [selectedTab, setSelectedTab] = useState<string>("bookTrip");
  const [referenceId, setReferenceId] = useState<string>("");
  const { bookingStatus, setBookingStatus } = useStore((state) => ({
    bookingStatus: state.bookingStatus,
    setBookingStatus: state.setBookingStatus,
  }));
  // State to store booking status
  console.log("bookingStatus", bookingStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For error messages

  // Mutation to fetch booking status
  const { mutate, isPending, isError }: UseMutationResult<BookingStatus, Error, string> = useMutation({
    mutationFn: async (referenceId: string) => {
      const response = await fetch(
        `${BASE_URL}/v1/passenger/booking-status/${referenceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert("Please enter correct Reference ID");
        throw new Error(errorData.message || "Failed to fetch booking status!");
      }

      console.log("BookTripstatus", response);

      return response.json();
    },
    onSuccess: (data) => {
      setBookingStatus(data); // Set the booking status data
      setErrorMessage(null); // Clear any previous errors
    },
    onError: (error: Error) => {
      setErrorMessage(error.message); // Set the error message
      setBookingStatus({ ticket: null }); // Clear previous booking status
    },
  });

  const handleTabChange = (e: RadioChangeEvent) => {
    setSelectedTab(e.target.value);
  };

  const handleSearch = () => {
    if (!referenceId) {
      alert("Please enter a Reference ID");
      return;
    }

    // Trigger mutation to fetch booking status
    mutate(referenceId);
  };
  return (
    <div
      className={`bg-[#fff] w-full rounded-t-[4rem] py-[2.5rem] px-[2.5rem] -mt-[4rem] md:w-[514px] md:mx-auto lg:mt-2 md:py-[4rem] ${className}`}
    >
      <Radio.Group
        onChange={handleTabChange}
        value={selectedTab}
        className="w-full flex"
      >
        <Radio.Button
          value="bookTrip"
          className={`w-[50%] text-[1.4rem] lg:text-[1.6rem]  text-center flex justify-center items-center rounded-l-[1rem] h-[4rem]`}
        >
          Book Trip
        </Radio.Button>
        <Radio.Button
          value="checkBookingStatus"
          className={`w-[60%] text-[1.4rem]  lg:text-[1.6rem]   text-center flex justify-center items-center rounded-r-[1rem] h-[4rem]`}
        >
          Check Booking Status
        </Radio.Button>
      </Radio.Group>
      <hr />
      <hr />
      {selectedTab === "bookTrip" ? (
        <Tabs defaultActiveKey="1" tabPosition={"top"}>
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">One-Way Trip</span>}
            key="1"
          >
            <OneWayTrip />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">Round Trip</span>}
            key="2"
          >
            {is_round_trip_tab_active == true ? (
              <RoundTrip />
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "20px",
                  justifyContent: "center",
                }}
              >
                <Spin />
              </div>
            )}
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Tabs defaultActiveKey="3" tabPosition={"top"}>
          <form className="w-full ">
            <label
              htmlFor="refID"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Reference ID
              <Input
                type="text"
                placeholder="Enter your reference ID"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
              />
            </label>

            <Link to="/booking-status">
              <Button
                type="primary"
                htmlType="submit"
                className="p-[2rem] font-[400] mt-[2rem] md:mt-[32px] text-[1.6rem] rounded-[10px] w-full"
                onClick={handleSearch}
                loading={isPending} // Show loading state while fetching
              >
                Search
              </Button>
            </Link>

            {/* Display error message */}
            {isError && errorMessage && (
              <p className="text-center font-[600] text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Display booking status if successful */}
            {bookingStatus && bookingStatus.ticket == null && (
              <div className="mt-4 ">
                <p className="font-[600] text-red-500">
                  Please, enter correct reference ID
                </p>
              </div>
            )}

            {/* Loading spinner */}
            {isPending && (
              <div className="flex justify-center mt-4">
                <Spin />
              </div>
            )}
          </form>
        </Tabs>
      )}
    </div>
  );
};

export default BookTrip;
