import SelectTrip from "@components/home/SelectTrip";
import MainLayout from "@layouts/MainLayout";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import car from "../../../public/pngs/cartrip.png";
import notfound from "../../../public/pngs/not-found-img.png";
import bg from "../../../public/svgs/bgimagetrip.svg";
import steering from "../../../public/pngs/steering.png";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa6";

import { use_round_trip } from "../../store/round_trip";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@api/index";
import {
  art_seats,
  availTrips_returnTrips_type,
  storeState,
  TripData_v1,
} from "../../types/Trip";
import { Two_way_beneficiary_info } from "@components/home/Two_way_beneficiary_info";
import { Two_way_personal_info } from "@components/home/Two_way_personal_info";
import { Two_way_review_details } from "@components/home/Two_way_review_details";
import { Two_way_PaymentStep } from "@components/home/Two_way_PaymentStep";

const RoundTripSearch = () => {
  const userDetailsString =
    localStorage.getItem("userDetails") ||
    sessionStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const [tripData, set_tripData] = useState<TripData_v1 | null>(null);

  // GETTING ROUNDTRIP FORM DATA FROM STORE
  const trip_data = use_round_trip((state: storeState) => state.trip_data);

  // GETTING ROUNDTRIP FORM DATA FROM STORE
  const trip_details = use_round_trip(
    (state: storeState) => state.round_trip_post_data
  );
  const set_trip_details = use_round_trip(
    (state: storeState) => state.set_round_trip_post_data
  );

  const [terminal_a, set_terminal_a] = useState("");
  const [terminal_b, set_terminal_b] = useState("");

  const fetchTerminals = async () => {
    const response = await fetch(`${BASE_URL}/v1/passenger/terminals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchAllTerminals"],
    queryFn: () => fetchTerminals(),
    // enabled: !!userToken,
  });

  useEffect(() => {
    if (trip_data.departure_terminal !== "") {
      console.log(trip_data.departure_terminal, "we wewewwe");
      if (data) {
        const terminal_list = data.terminals;
        console.log(data, "real list be this");

        const departure_terminal_name = terminal_list?.find((item: any) => {
          return item._id === trip_data.departure_terminal;
        });
        console.log(
          departure_terminal_name?.terminalName,
          departure_terminal_name?.terminalAddress,
          "we wewewwe"
        );
        set_terminal_a(
          `${departure_terminal_name?.terminalName}, ${departure_terminal_name?.terminalAddress}`
        );

        const arrival_terminal_name = terminal_list?.find((item: any) => {
          return item._id === trip_data.arrival_terminal;
        });
        set_terminal_b(
          `${arrival_terminal_name?.terminalName}, ${arrival_terminal_name?.terminalAddress}`
        );
      }
    }
  }, [data]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // GETTING "TERMINAL FROM DB TO SET TERMINAL ID TO TERMINAL" NAME ENDS HERE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [return_trip_modal_open, set_return_trip_modal_open] = useState(false);
  const [details, setDetails] = useState<boolean>(false);
  const [return_trip_id, set_return_trip_id] = useState<string>("");
  const [return_trip_cost, set_return_trip_cost] = useState<number>(0);
  const [departure_trip_id, set_departure_trip_id] = useState<string>("");
  const [departure_trip_cost, set_departure_trip_cost] = useState<number>(0);

  // const [single_return_trip_data, set_single_return_trip_data] = useState<availTrips_returnTrips_type>()

  const showModal = (id: string, cost: number, item: any) => {
    set_departure_trip_id(id);
    set_departure_trip_cost(cost);
    setOpen(true);
    console.log(item, "the_items");
  };
  const show_return_trip_modal = (id: string, cost: number, item: any) => {
    set_return_trip_id(id);
    set_return_trip_cost(cost);
    set_return_trip_modal_open(true);
    console.log(item, "the_items");

    // tripData?.returnTrips.map((item)=>{
    //    if(item._id === id){
    //     set_return_trip_modal_open(true);
    //     console.log(item._id,"_help_",id)
    //    }
    // })
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setDetails(true);
    }, 3000);
    set_trip_details({
      ...trip_details,
      //
      travellingWithAChild: trip_data.number_of_children > 0 ? "yes" : "no",
      departureSeatNumbers: all_selected_array,
      returnSeatNumbers: all_selected_array2,
      availableTrip: departure_trip_id,
      returnTrip: return_trip_id,
    });
    console.log(all_selected_array2, all_selected_array);
  };

  const handleCancel = () => {
    set_all_selected_array([]);
    setOpen(false);
  };
  const handleCancel2 = () => {
    set_all_selected_array2([]);
    set_return_trip_modal_open(false);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepCompletion = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };
  // const back_to_view_details = () => {
  //   if (!completedSteps.includes(currentStep)) {
  //     setCompletedSteps([...completedSteps, currentStep]);
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  const [openReview, setOpenReview] = useState(false);

  const showReviewModal = () => {
    setOpenReview(true);
  };

  const [openPayment, setOpenPayment] = useState(false);

  const showPaymentModal = () => {
    setOpenPayment(true);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Two_way_personal_info
            currentStep={currentStep}
            handleStepCompletion={handleStepCompletion}
            numberOfBeneficiaries={
              trip_data.number_of_adults > 1
                ? trip_data.number_of_adults - 1
                : 0
            }
            numberOfAdults={trip_data.number_of_adults}
            // numberOfChildren={trip_data.number_of_children}
            the_trip_cost={return_trip_cost + departure_trip_cost}
          />
        );
      case 2:
        return (
          <Two_way_beneficiary_info
            currentStep={currentStep}
            handleStepCompletion={handleStepCompletion}
            showReviewModal={showReviewModal}
            numberOfBeneficiaries={
              trip_data.number_of_adults > 1
                ? trip_data.number_of_adults - 1
                : 0
            }
            numberOfChildren={trip_data.number_of_children}
            numberOfAdults={trip_data.number_of_adults}
          />
        );
      case 3:
        return (
          <Two_way_review_details
            currentStep={currentStep}
            handleStepCompletion={handleStepCompletion}
            openReview={openReview}
            setOpenReview={setOpenReview}
            showPaymentModal={showPaymentModal}
            numberOfBeneficiaries={trip_data.number_of_adults}
            numberOfChildren={trip_data.number_of_children}
            numberOfAdults={trip_data.number_of_adults}
            the_trip_cost={return_trip_cost + departure_trip_cost}
            departure_trip_cost={departure_trip_cost}
            return_trip_cost={return_trip_cost}
          />
        );
      case 4:
        return (
          <Two_way_PaymentStep
            currentStep={currentStep}
            showPaymentModal={showPaymentModal}
            numberOfBeneficiaries={trip_data.number_of_adults}
            numberOfChildren={trip_data.number_of_children}
            numberOfAdults={trip_data.number_of_adults}
            the_trip_cost={return_trip_cost + departure_trip_cost}
            departure_trip_cost={departure_trip_cost}
            return_trip_cost={return_trip_cost}
            openPayment={openPayment}
            setOpenPayment={setOpenPayment}
            title={null}
          />
        );

      default:
        return null;
    }
  };

  const fetch_available_trips = async () => {
    const response = await fetch(
      `${BASE_URL}/v1/passenger/round-trip/${trip_data.departure_terminal}/${trip_data.arrival_terminal}/${trip_data.departure_date}/${trip_data.arrival_date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    return response.json();
  };

  const {
    data: available_trip_data,
    // error:available_trip_error,
    isLoading: available_trip_loading,
  } = useQuery({
    queryKey: ["fetch_available_trips"],
    queryFn: () => fetch_available_trips(),
    // enabled: !!userToken,
  });

  useEffect(() => {
    if (available_trip_data) {
      if (
        available_trip_data.availableTrips.length !== 0 &&
        available_trip_data.returnTrips.length !== 0
      ) {
        set_tripData(available_trip_data);
        console.log(available_trip_data, "availableee_001");
        return;
      }
      set_tripData(null);
      console.log(available_trip_data, "out---");
    }
    set_tripData(null);
  }, [available_trip_data]);

  const getSeatColor = (status: string): string => {
    switch (status) {
      case "available":
        return "#666666"; // Color for available seats
      case "booked":
        return "#E6E6E6"; // Color for booked seats
      default:
        return "#CCCCCC"; // Default color if status doesn't match any case
    }
  };

  // FOR DEPARTURE SEAT SELECTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [seat_clicked, set_seat_clicked] = useState<boolean>(false);
  const [all_selected_array, set_all_selected_array] = useState<number[]>([]);
  const run_seat_clicked = (seat_number: number) => {
    if (all_selected_array.includes(seat_number)) {
      // Use filter to create a new array without the seat_number
      const edited_array = all_selected_array.filter(
        (item) => item !== seat_number
      );
      set_all_selected_array(edited_array);

      return;
    }
    set_all_selected_array((prevArray) => [...prevArray, seat_number]);
    set_seat_clicked(true);
  };

  const [show_return_trips, set_show_return_trips] = useState<boolean>(false);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // FOR ARRIVAL SEAT SELECTION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [seat_clicked2, set_seat_clicked2] = useState<boolean>(false);
  const [all_selected_array2, set_all_selected_array2] = useState<number[]>([]);
  const run_seat_clicked2 = (seat_number: number) => {
    if (all_selected_array2.includes(seat_number)) {
      // Use filter to create a new array without the seat_number
      const edited_array = all_selected_array2.filter(
        (item) => item !== seat_number
      );
      set_all_selected_array2(edited_array);

      return;
    }
    set_all_selected_array2((prevArray) => [...prevArray, seat_number]);
    set_seat_clicked2(true);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <MainLayout>
      <div className=" bg-[#e6e6e6] pb-16 relative">
        <div className="z-20 w-full">
          <img
            src={bg}
            alt="background image"
            className=" h-[19.2rem] md:h-[24rem] object-cover w-full"
          />
        </div>

        <div
          className="px-[2.4rem] md:px-[6.4rem] lg:px-[10rem] lg:max-w-[1440px] lg:mx-auto z-20 -mt-[18rem] relative 
         "
        >
          <div
            onClick={handleBackClick}
            className="flex items-center text-[#fff] text-[1.2rem] md:text-[1.8rem] py-4 cursor-pointer"
          >
            <IoIosArrowBack />
            Back
          </div>

          {tripData && tripData.availableTrips.length > 0 ? (
            show_return_trips === false ? (
              <div className="bg-[#fff] px-[1.5rem] md:px-[3rem] lg:px-[4rem] pt-[0.5rem] md:pt-[2rem]  pb-10 md:py-28 rounded-[1rem] ">
                {error ? (
                  <div>There was an error: {(error as Error).message}</div>
                ) : isLoading ? (
                  <div className="w-full flex justify-center mt-8">
                    <Spin />
                  </div>
                ) : (
                  <div className="mt-[1rem] flex justify-between gap-[0.8rem] bg-[#fff] lg:mt-[4rem]">
                    <div className="flex flex-col gap-[0.8rem]">
                      <div className="flex gap-[0.8rem] items-center lg:mt-[rem]">
                        <CiLocationOn size={28} color="#2F2FC8" />
                        <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                          {terminal_a}
                        </p>
                      </div>
                      <div className="flex-col">
                        <TbDotsVertical color="#CCCCCC" size={20} />
                      </div>
                      <div className="flex gap-[0.8rem] items-center">
                        <IoShieldCheckmarkOutline color="#0A8917" size={24} />
                        <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                          {terminal_b}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        Round Trip
                      </p>
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        {trip_data.number_of_adults === 0 ? (
                          "No adult"
                        ) : trip_data.number_of_adults === 1 ? (
                          <>{trip_data.number_of_adults} Adult</>
                        ) : (
                          <>{trip_data.number_of_adults} Adults</>
                        )}
                      </p>
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        {trip_data.number_of_children === 0 ? (
                          "No child"
                        ) : trip_data.number_of_children === 1 ? (
                          <>{trip_data.number_of_children} Child</>
                        ) : (
                          <>{trip_data.number_of_children} CHildren</>
                        )}
                      </p>
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        {trip_data.departure_date}
                      </p>
                    </div>
                  </div>
                )}

                <hr className="my-[2rem]" />

                <div className="flex flex-col gap-[1.6rem]">
                  <h4 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
                    Select Trip (Departure)
                  </h4>
                  <div className="flex flex-col gap-[1.6rem] lg:gap-[3.2rem]">
                    {available_trip_loading ? (
                      <div className="w-full flex justify-center mt-8">
                        <Spin />
                      </div>
                    ) : available_trip_data ? (
                      <>
                        {tripData &&
                          tripData.availableTrips.map(
                            (
                              item: availTrips_returnTrips_type,
                              index: number
                            ) => (
                              <div key={index.toString()}>
                                <SelectTrip
                                  key={index}
                                  imageSrc={car}
                                  altText={"car image"}
                                  route={`${item?.from?.terminalName} ==> ${item?.to?.terminalName}`}
                                  carModel={item?.vehicle?.vehicleName}
                                  seatsAvailable={item?.seatsAvailable}
                                  departureTime={item?.departureDateTime}
                                  price={item?.tripCost}
                                  onSelectSeat={() =>
                                    showModal(item?._id, item?.tripCost, item)
                                  }
                                />

                                {/* CUSTOMER SEATS SELECTION UI>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                                {departure_trip_id === item._id ? (
                                  <Modal
                                    className="px-2 md:px-28 lg:px-20 "
                                    centered
                                    open={open}
                                    closable={false}
                                    title={null}
                                    onOk={() =>
                                      set_show_return_trips((value) => !value)
                                    }
                                    onCancel={handleCancel}
                                    footer={[
                                      <div className="md:py-16">
                                        <div className="text-[2rem] text-center w-full mb-4 font-[700]">
                                          Select Seat(Departure)
                                        </div>
                                        <div className="flex items-center w-full justify-between md:mt-[4rem]">
                                          <div className="flex items-center gap-2">
                                            <div className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] rounded-full bg-textGray"></div>
                                            <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                                              Booked Seat
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] rounded-full bg-primaryColor"></div>
                                            <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                                              Selected Seat
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] rounded-full bg-textDeepGray"></div>
                                            <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                                              Available Seat
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-between mt-[2.4rem]">
                                          <div className="flex w-full items-center justify-between px-10">
                                            <img
                                              src={steering}
                                              alt="car steering image"
                                            />
                                            {seat_clicked === true &&
                                            all_selected_array.includes(
                                              item.seatsAndStatus[0].seatNumber
                                            ) ? (
                                              <div
                                                key={index.toString()}
                                                className={`relative mt-[2.4rem] ${
                                                  item.seatsAndStatus[0]
                                                    .seatStatus === "available"
                                                    ? "cursor-pointer"
                                                    : "pointer-events-none"
                                                } `}
                                                onClick={() => {
                                                  if (
                                                    trip_data.number_of_adults
                                                  ) {
                                                    if (
                                                      all_selected_array.length <
                                                        trip_data.number_of_adults ||
                                                      all_selected_array.includes(
                                                        item.seatsAndStatus[0]
                                                          .seatNumber
                                                      )
                                                    ) {
                                                      run_seat_clicked(
                                                        item.seatsAndStatus[0]
                                                          .seatNumber
                                                      );
                                                    }
                                                  }
                                                }}
                                              >
                                                <FaUser
                                                  size={35}
                                                  color="#2f2fc8"
                                                />
                                                <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                  {
                                                    item.seatsAndStatus[0]
                                                      .seatNumber
                                                  }
                                                </span>
                                              </div>
                                            ) : (
                                              <div
                                                key={index.toString()}
                                                className={`relative mt-[2.4rem] ${
                                                  item.seatsAndStatus[0]
                                                    .seatStatus === "available"
                                                    ? "cursor-pointer"
                                                    : "pointer-events-none"
                                                } `}
                                                onClick={() => {
                                                  if (
                                                    trip_data.number_of_adults
                                                  ) {
                                                    if (
                                                      all_selected_array.length <
                                                        trip_data.number_of_adults ||
                                                      all_selected_array.includes(
                                                        item.seatsAndStatus[0]
                                                          .seatNumber
                                                      )
                                                    ) {
                                                      run_seat_clicked(
                                                        item.seatsAndStatus[0]
                                                          .seatNumber
                                                      );
                                                    }
                                                  }
                                                }}
                                              >
                                                <FaUser
                                                  size={35}
                                                  color={getSeatColor(
                                                    item.seatsAndStatus[0]
                                                      .seatStatus
                                                  )}
                                                />
                                                <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                  {
                                                    item.seatsAndStatus[0]
                                                      .seatNumber
                                                  }
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex flex-wrap gap-10 justify-center">
                                            {item.seatsAndStatus
                                              .slice(1)
                                              .map((seat: art_seats, index) =>
                                                seat_clicked === true &&
                                                all_selected_array.includes(
                                                  seat.seatNumber
                                                ) ? (
                                                  <div
                                                    key={index.toString()}
                                                    className={`relative mt-[2.4rem] ${
                                                      seat.seatStatus ===
                                                      "available"
                                                        ? "cursor-pointer"
                                                        : "pointer-events-none"
                                                    } `}
                                                    onClick={() => {
                                                      if (
                                                        trip_data.number_of_adults
                                                      ) {
                                                        if (
                                                          all_selected_array.length <
                                                            trip_data.number_of_adults ||
                                                          all_selected_array.includes(
                                                            seat.seatNumber
                                                          )
                                                        ) {
                                                          run_seat_clicked(
                                                            seat.seatNumber
                                                          );
                                                        }
                                                      }
                                                    }}
                                                  >
                                                    <FaUser
                                                      size={35}
                                                      color="#2f2fc8"
                                                    />
                                                    <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                      {seat.seatNumber}
                                                    </span>
                                                  </div>
                                                ) : (
                                                  <div
                                                    key={index.toString()}
                                                    className={`relative mt-[2.4rem] ${
                                                      seat.seatStatus ===
                                                      "available"
                                                        ? "cursor-pointer"
                                                        : "pointer-events-none"
                                                    } `}
                                                    onClick={() => {
                                                      if (
                                                        trip_data.number_of_adults
                                                      ) {
                                                        if (
                                                          all_selected_array.length <
                                                            trip_data.number_of_adults ||
                                                          all_selected_array.includes(
                                                            seat.seatNumber
                                                          )
                                                        ) {
                                                          run_seat_clicked(
                                                            seat.seatNumber
                                                          );
                                                        }
                                                      }
                                                    }}
                                                  >
                                                    <FaUser
                                                      size={35}
                                                      color={getSeatColor(
                                                        seat.seatStatus
                                                      )}
                                                    />
                                                    <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                      {seat.seatNumber}
                                                    </span>
                                                  </div>
                                                )
                                              )}
                                          </div>
                                        </div>

                                        <Button
                                          key="submit"
                                          type="primary"
                                          loading={loading}
                                          onClick={() => {
                                            // handleCancel()
                                            set_show_return_trips(
                                              (value) => !value
                                            );
                                          }}
                                          className={`w-full mt-10 h-[4.8rem] text-[1.2rem] lg:text-[1.6rem] font-[500] rounded-[1rem] 
      ${
        all_selected_array.length === trip_data.number_of_adults
          ? "bg-primaryColor text-[#fff]"
          : "bg-gray-400 text-[#fff] cursor-not-allowed"
      }
          `}
                                          disabled={
                                            all_selected_array.length <
                                            trip_data.number_of_adults
                                          }
                                        >
                                          Continue
                                        </Button>
                                      </div>,
                                    ]}
                                  >
                                    <MdClose
                                      className="absolute top-4 right-4 md:right-10 cursor-pointer"
                                      size={30}
                                      onClick={handleCancel}
                                    />
                                  </Modal>
                                ) : (
                                  ""
                                )}
                                {/* CUSTOMER SEATS SELECTION UI>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                              </div>
                            )
                          )}
                      </>
                    ) : (
                      <div>There was an error: {(error as Error).message}</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#fff] px-[1.5rem] md:px-[3rem] lg:px-[4rem] pt-[0.5rem] md:pt-[2rem]  pb-10 md:py-28 rounded-[1rem] ">
                {error ? (
                  <div>There was an error: {(error as Error).message}</div>
                ) : isLoading ? (
                  <div className="w-full flex justify-center mt-8">
                    <Spin />
                  </div>
                ) : (
                  <div className="mt-[1rem] flex justify-between gap-[0.8rem] bg-[#fff] lg:mt-[4rem]">
                    <div className="flex flex-col gap-[0.8rem]">
                      <div className="flex gap-[0.8rem] items-center lg:mt-[rem]">
                        <CiLocationOn size={28} color="#2F2FC8" />
                        <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                          {terminal_a}
                        </p>
                      </div>
                      <div className="flex-col">
                        <TbDotsVertical color="#CCCCCC" size={20} />
                      </div>
                      <div className="flex gap-[0.8rem] items-center">
                        <IoShieldCheckmarkOutline color="#0A8917" size={24} />
                        <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                          {terminal_b}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        Round Trip
                      </p>
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        {trip_data.number_of_adults === 0 ? (
                          "No adult"
                        ) : trip_data.number_of_adults === 1 ? (
                          <>{trip_data.number_of_adults} Adult</>
                        ) : (
                          <>{trip_data.number_of_adults} Adults</>
                        )}
                      </p>
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        {trip_data.number_of_children === 0 ? (
                          "No child"
                        ) : trip_data.number_of_children === 1 ? (
                          <>{trip_data.number_of_children} Child</>
                        ) : (
                          <>{trip_data.number_of_children} CHildren</>
                        )}
                      </p>
                      <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                        {trip_data.departure_date}
                      </p>
                    </div>
                  </div>
                )}

                <hr className="my-[2rem]" />
                {details ? (
                  <div className="flex flex-col gap-[1.6rem]">
                    <h4 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
                      Dear {userDetails && userDetails.fullName},
                      <br />
                      We just need to know a few more information about you
                    </h4>
                    <div className="flex items-start justify-between md:mt-[3.2rem]">
                      {[1, 2, 3, 4]
                        .filter((step) => {
                          // Exclude step 2 when there are no beneficiaries and no children
                          if (
                            trip_data.number_of_adults === 1 &&
                            trip_data.number_of_children === 0 &&
                            step === 2
                          ) {
                            return false;
                          }
                          return true;
                        })
                        .map((filteredStep, index) => (
                          <React.Fragment key={filteredStep}>
                            {index !== 0 && (
                              <div
                                className={`border-t-2 ${
                                  currentStep === filteredStep
                                    ? "border-primaryColor"
                                    : "border-[#999999]"
                                } border-primaryColor flex-1 mt-[0.8rem] md:mt-[1.6rem]`}
                              ></div>
                            )}
                            <div className="flex flex-col items-center justify-center gap-1 w-[10%]">
                              {completedSteps.includes(filteredStep) ? (
                                <>
                                  {" "}
                                  <MdCheckCircle
                                    size={20}
                                    color="#2F2FC8"
                                    className="flex md:hidden"
                                  />
                                  <MdCheckCircle
                                    size={45}
                                    color="#2F2FC8"
                                    className="hidden md:flex"
                                  />
                                </>
                              ) : (
                                <div
                                  className={`w-[2rem] h-[2rem] md:w-[3.6rem] md:h-[3.6rem] rounded-full  border  ${
                                    currentStep === filteredStep
                                      ? "border-primaryColor text-primaryColor "
                                      : "border-[#999999] text-[#999999]"
                                  } flex justify-center items-center text-[1.2rem] cursor-pointer`}
                                >
                                  {index + 1}
                                </div>
                              )}
                              <p className="text-[1rem] text-center">
                                {filteredStep === 1 && (
                                  <span
                                    className={`${
                                      currentStep === filteredStep
                                        ? "text-primaryColor"
                                        : "text-[#999999]"
                                    } text-[1rem] md:text-[1.6rem] font-[500]`}
                                  >
                                    Personal Information
                                  </span>
                                )}
                                {filteredStep === 2 && (
                                  <span
                                    className={`${
                                      currentStep === filteredStep
                                        ? "text-primaryColor"
                                        : "text-[#999999]"
                                    } text-[1rem] md:text-[1.6rem] font-[500]`}
                                  >
                                    Beneficiary Information
                                  </span>
                                )}
                                {filteredStep === 3 && (
                                  <span
                                    onClick={showReviewModal}
                                    className={`${
                                      currentStep === filteredStep
                                        ? "text-primaryColor"
                                        : "text-[#999999]"
                                    } text-[1rem] md:text-[1.6rem] font-[500] cursor-pointer`}
                                  >
                                    Review Details
                                  </span>
                                )}
                                {filteredStep === 4 && (
                                  <span
                                    onClick={showPaymentModal}
                                    className={`${
                                      currentStep === filteredStep
                                        ? "text-primaryColor"
                                        : "text-[#999999]"
                                    } text-[1rem] md:text-[1.6rem] font-[500] cursor-pointer`}
                                  >
                                    Payment
                                  </span>
                                )}
                              </p>
                            </div>
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="mt-4">{renderStep(currentStep)}</div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[1.6rem]">
                    <h4 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
                      Select Trip (Arrival)
                    </h4>
                    <div className="flex flex-col gap-[1.6rem] lg:gap-[3.2rem]">
                      {available_trip_loading ? (
                        <div className="w-full flex justify-center mt-8">
                          <Spin />
                        </div>
                      ) : available_trip_data ? (
                        <>
                          {tripData &&
                            tripData.returnTrips.map(
                              (
                                item: availTrips_returnTrips_type,
                                index: number
                              ) => (
                                <div key={index.toString()}>
                                  <SelectTrip
                                    key={index}
                                    imageSrc={car}
                                    altText={"car image"}
                                    route={`${item?.from?.terminalName} ==> ${item?.to?.terminalName}`}
                                    carModel={item?.vehicle?.vehicleName}
                                    seatsAvailable={item?.seatsAvailable}
                                    departureTime={item?.departureDateTime}
                                    price={item?.tripCost}
                                    onSelectSeat={() =>
                                      show_return_trip_modal(
                                        item?._id,
                                        item?.tripCost,
                                        item
                                      )
                                    }
                                  />

                                  {/* CUSTOMER SEATS SELECTION UI>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                                  {return_trip_id === item._id ? (
                                    <Modal
                                      className="px-2 md:px-28 lg:px-20 "
                                      centered
                                      open={return_trip_modal_open}
                                      closable={false}
                                      title={null}
                                      onOk={handleOk}
                                      onCancel={handleCancel2}
                                      footer={[
                                        <div className="md:py-16">
                                          <div className="text-[2rem] text-center w-full mb-4 font-[700]">
                                            Select Seat(Arrival)
                                          </div>
                                          <div className="flex items-center w-full justify-between md:mt-[4rem]">
                                            <div className="flex items-center gap-2">
                                              <div className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] rounded-full bg-textGray"></div>
                                              <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                                                Booked Seat
                                              </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <div className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] rounded-full bg-primaryColor"></div>
                                              <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                                                Selected Seat
                                              </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <div className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] rounded-full bg-textDeepGray"></div>
                                              <p className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                                                Available Seat
                                              </p>
                                            </div>
                                          </div>

                                          <div className="flex flex-col items-center justify-between mt-[2.4rem]">
                                            <div className="flex w-full items-center justify-between px-10">
                                              <img
                                                src={steering}
                                                alt="car steering image"
                                              />
                                              {seat_clicked2 === true &&
                                              all_selected_array2.includes(
                                                item.seatsAndStatus[0]
                                                  .seatNumber
                                              ) ? (
                                                <div
                                                  key={index.toString()}
                                                  className={`relative mt-[2.4rem] ${
                                                    item.seatsAndStatus[0]
                                                      .seatStatus ===
                                                    "available"
                                                      ? "cursor-pointer"
                                                      : "pointer-events-none"
                                                  } `}
                                                  onClick={() => {
                                                    if (
                                                      trip_data.number_of_adults
                                                    ) {
                                                      if (
                                                        all_selected_array2.length <
                                                          trip_data.number_of_adults ||
                                                        all_selected_array2.includes(
                                                          item.seatsAndStatus[0]
                                                            .seatNumber
                                                        )
                                                      ) {
                                                        run_seat_clicked2(
                                                          item.seatsAndStatus[0]
                                                            .seatNumber
                                                        );
                                                      }
                                                    }
                                                  }}
                                                >
                                                  <FaUser
                                                    size={35}
                                                    color="#2f2fc8"
                                                  />
                                                  <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    {
                                                      item.seatsAndStatus[0]
                                                        .seatNumber
                                                    }
                                                  </span>
                                                </div>
                                              ) : (
                                                <div
                                                  key={index.toString()}
                                                  className={`relative mt-[2.4rem] ${
                                                    item.seatsAndStatus[0]
                                                      .seatStatus ===
                                                    "available"
                                                      ? "cursor-pointer"
                                                      : "pointer-events-none"
                                                  } `}
                                                  onClick={() => {
                                                    if (
                                                      trip_data.number_of_adults
                                                    ) {
                                                      if (
                                                        all_selected_array2.length <
                                                          trip_data.number_of_adults ||
                                                        all_selected_array2.includes(
                                                          item.seatsAndStatus[0]
                                                            .seatNumber
                                                        )
                                                      ) {
                                                        run_seat_clicked2(
                                                          item.seatsAndStatus[0]
                                                            .seatNumber
                                                        );
                                                      }
                                                    }
                                                  }}
                                                >
                                                  <FaUser
                                                    size={35}
                                                    color={getSeatColor(
                                                      item.seatsAndStatus[0]
                                                        .seatStatus
                                                    )}
                                                  />
                                                  <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    {
                                                      item.seatsAndStatus[0]
                                                        .seatNumber
                                                    }
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                            <div className="flex flex-wrap gap-10 justify-center">
                                              {item.seatsAndStatus
                                                .slice(1)
                                                .map((seat: art_seats, index) =>
                                                  seat_clicked2 === true &&
                                                  all_selected_array2.includes(
                                                    seat.seatNumber
                                                  ) ? (
                                                    <div
                                                      key={index.toString()}
                                                      className={`relative mt-[2.4rem] ${
                                                        seat.seatStatus ===
                                                        "available"
                                                          ? "cursor-pointer"
                                                          : "pointer-events-none"
                                                      } `}
                                                      onClick={() => {
                                                        if (
                                                          trip_data.number_of_adults
                                                        ) {
                                                          if (
                                                            all_selected_array2.length <
                                                              trip_data.number_of_adults ||
                                                            all_selected_array2.includes(
                                                              seat.seatNumber
                                                            )
                                                          ) {
                                                            run_seat_clicked2(
                                                              seat.seatNumber
                                                            );
                                                          }
                                                        }
                                                      }}
                                                    >
                                                      <FaUser
                                                        size={35}
                                                        color="#2f2fc8"
                                                      />
                                                      <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        {seat.seatNumber}
                                                      </span>
                                                    </div>
                                                  ) : (
                                                    <div
                                                      key={index.toString()}
                                                      className={`relative mt-[2.4rem] ${
                                                        seat.seatStatus ===
                                                        "available"
                                                          ? "cursor-pointer"
                                                          : "pointer-events-none"
                                                      } `}
                                                      onClick={() => {
                                                        if (
                                                          trip_data.number_of_adults
                                                        ) {
                                                          if (
                                                            all_selected_array2.length <
                                                              trip_data.number_of_adults ||
                                                            all_selected_array2.includes(
                                                              seat.seatNumber
                                                            )
                                                          ) {
                                                            run_seat_clicked2(
                                                              seat.seatNumber
                                                            );
                                                          }
                                                        }
                                                      }}
                                                    >
                                                      <FaUser
                                                        size={35}
                                                        color={getSeatColor(
                                                          seat.seatStatus
                                                        )}
                                                      />
                                                      <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        {seat.seatNumber}
                                                      </span>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          </div>

                                          <Button
                                            key="submit"
                                            type="primary"
                                            loading={loading}
                                            onClick={handleOk}
                                            className={`w-full mt-10 h-[4.8rem] text-[1.2rem] lg:text-[1.6rem] font-[500] rounded-[1rem] 
${
  all_selected_array2.length === trip_data.number_of_adults
    ? "bg-primaryColor text-[#fff]"
    : "bg-gray-400 text-[#fff] cursor-not-allowed"
}
  `}
                                            disabled={
                                              all_selected_array2.length <
                                              trip_data.number_of_adults
                                            }
                                          >
                                            Continue
                                          </Button>
                                        </div>,
                                      ]}
                                    >
                                      <MdClose
                                        className="absolute top-4 right-4 md:right-10 cursor-pointer"
                                        size={30}
                                        onClick={handleCancel2}
                                      />
                                    </Modal>
                                  ) : (
                                    ""
                                  )}

                                  {/* CUSTOMER SEATS SELECTION UI>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                                </div>
                              )
                            )}
                        </>
                      ) : (
                        <div>
                          There was an error: {(error as Error).message}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center gap-[2rem] bg-[#fff] h-[34.3rem] rounded-[1rem] lg:w-[59rem] lg:mx-auto">
              <img src={notfound} alt="not found image" />
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-[1.8rem] lg:text-[2.4rem]  font-[700]">
                  Oops...No Available Trip
                </h5>
                <p className="text-[1.6rem] lg:text-[2rem]  font-[500]">
                  Please search for another Date or Trip
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default RoundTripSearch;
