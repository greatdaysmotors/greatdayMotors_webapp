import Input from "@components/input";
import { Button, Radio, Spin, Tabs } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { use_round_trip } from "../../store/round_trip";
import { storeState } from "../../types/Trip";
import OneWayTrip from "./OneWayTrip";
import RoundTrip from "./RoundTrip";
// import { useBookingStatus } from "@hooks/useBookingStatus";
import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useStore from "../../store";

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
interface BookTripProps {
  className?: string;
}

const BookTrip: React.FC<BookTripProps> = ({ className }) => {
  const navigate = useNavigate();
  const userToken = useAuthToken();

  const is_round_trip_tab_active = use_round_trip(
    (state: storeState) => state.round_trip_active
  );

  const [selectedTab, setSelectedTab] = useState<string>("bookTrip");
  const [referenceId, setReferenceId] = useState<string>("");
  const [nullTicket, setNullTicket] = useState<boolean>(false);
  const { setBookingStatus } = useStore((state) => ({
    bookingStatus: state.bookingStatus,
    setBookingStatus: state.setBookingStatus,
  }));

  // console.log("bookingStatus", bookingStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mutation to fetch booking status
  const {
    mutate,
    isPending,
    isError,
  }: UseMutationResult<BookingStatus, Error, string> = useMutation({
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
        console.log("errorData", errorData);
        throw new Error(
          errorData.errorMessage || "Failed to fetch booking status!"
        );
      }

      console.log("BookTripstatus", response);

      return response.json();
    },
    onSuccess: (data) => {
      if (data.ticket === null) {
        setNullTicket(true);
      } else {
        setBookingStatus(data);
        navigate("/booking-status");
        setErrorMessage(null);
      }
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setBookingStatus({ ticket: null });
    },
  });

  const handleTabChange = (e: RadioChangeEvent) => {
    setSelectedTab(e.target.value);
  };

  const handleSearch = () => {
    if (!userToken) {
      // If the user is not logged in, navigate to the login page
      navigate("/login");
      return;
    }
    mutate(referenceId);
    setNullTicket(false);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#book-trip") {
      setSelectedTab("checkBookingStatus");
      setTimeout(() => {
        document
          .getElementById("book-trip-tab")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div
      id="book-trip-tab"
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

            <Button
              type="primary"
              htmlType="submit"
              className="p-[2rem] font-[400] mt-[2rem] md:mt-[32px] text-[1.6rem] rounded-[10px] w-full"
              onClick={handleSearch}
              loading={isPending} // Show loading state while fetching
            >
              Search
            </Button>

            {/* Display error message */}
            {isError && errorMessage && (
              <p className="text-center font-[600] text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Display booking status if successful */}
            {nullTicket && (
              <div className="mt-4 ">
                <p className="font-[600] text-red-500">
                  No information for this ID
                </p>
              </div>
            )}

            {/* Loading spinner */}
            {/* {isPending && (
              <div className="flex justify-center mt-4">
                <Spin />
              </div>
            )} */}
          </form>
        </Tabs>
      )}
    </div>
  );
};

export default BookTrip;
