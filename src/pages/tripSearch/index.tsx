import SelectTrip from "@components/home/SelectTrip";
import MainLayout from "@layouts/MainLayout";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbDotsVertical } from "react-icons/tb";
import { Link } from "react-router-dom";
import notfound from "../../../public/pngs/not-found-img.png";
import bg from "../../../public/svgs/bgimagetrip.svg";
import steering from "../../../public/pngs/steering.png";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { PersonalInfoStep } from "../../components/home/PersonalInfo";
import { BeneficiaryInfoStep } from "@components/home/BeneficiaryInfo";
import { ReviewDetailsStep } from "@components/home/ReviewDetail";
import { PaymentStep } from "@components/home/PaymentStep";
import useStore from "../../store";
import { TripData } from "../../types/Trip";
import { Seat } from "../../types/Seat";
import { useTripContext } from "../../context";

const initialSeats = [
  { id: 1, color: "#666666", clickable: true },
  { id: 2, color: "#E6E6E6", clickable: false },
  { id: 3, color: "#E6E6E6", clickable: false },
  { id: 4, color: "#666666", clickable: true },
  { id: 5, color: "#666666", clickable: true },
  { id: 6, color: "#666666", clickable: true },
  { id: 7, color: "#666666", clickable: true },
  { id: 8, color: "#666666", clickable: true },
  { id: 9, color: "#666666", clickable: true },
  { id: 10, color: "#666666", clickable: true },
  { id: 11, color: "#666666", clickable: true },
  { id: 12, color: "#666666", clickable: true },
];

const TripSearch = () => {
  const { isPending } = useTripContext();
  const userDetailsString =
    localStorage.getItem("userDetails") ||
    sessionStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  // console.log("userDetails", userDetails);

  const trips = useStore((state) => state.trips);
  // console.log("trips", trips);

  const oneWayTripPayload = useStore((state) => state.oneWayTripPayload);
  // console.log("oneWayTripPayload", oneWayTripPayload);

  const setTripDetails = useStore((state) => state.setTripDetails);

  const tripDetails = useStore((state) => state.tripDetails);
  // console.log("tripDetails", tripDetails);

  const numberOfChildren = Number(tripDetails.travellingWithAChild) || 0;
  const numberOfAdults = (oneWayTripPayload && oneWayTripPayload.adult) || 1;
  const numberOfBeneficiaries = numberOfAdults > 1 ? numberOfAdults - 1 : 0;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [aTrip, setATrip] = useState<TripData | null>(null);

  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const showModal = (trip: TripData) => {
    // console.log("singletrip", trip);
    setOpen(true);
    setATrip(trip);
    setTripDetails({
      ...tripDetails,
      availableTrip: trip._id,
    });
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setDetails(true);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (aTrip && aTrip.seatsAndStatus) {
      const mappedSeats = aTrip.seatsAndStatus.map((seat) => ({
        id: seat.seatNumber,
        color: seat.seatStatus === "available" ? "#666666" : "#E6E6E6",
        clickable: seat.seatStatus === "available",
      }));
      setSeats(mappedSeats);
    }
  }, [aTrip]);

  useEffect(() => {
    const selectedSeat = seats
      .filter((seat) => seat.color === "#2F2FC8")
      .map((seat) => seat.id);
    setSelectedSeats(selectedSeat);
  }, [seats]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []); 

  const handleSeatClick = (id: number) => {
    const clickedSeat = seats.find((seat) => seat.id === id);

    if (!clickedSeat || !clickedSeat.clickable) return;

    if (clickedSeat.color === "#2F2FC8") {
      // Deselect the seat
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === id ? { ...seat, color: "#666666" } : seat
        )
      );
    } else if (selectedSeats.length < numberOfAdults) {
      // If the seat is not already selected and we haven't reached the limit, select it
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === id ? { ...seat, color: "#2F2FC8" } : seat
        )
      );
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepCompletion = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const [openReview, setOpenReview] = useState(false);

  const showReviewModal = () => {
    setOpenReview(true);
  };

  const [openPayment, setOpenPayment] = useState(false);

  const showPaymentModal = () => {
    setOpenPayment(true);
  };

  // const [ticketRefId, setTicketRefId] = useState("");
  // console.log("ticketRefId", ticketRefId);

  const T_UID = useStore((state) => state.ticketUID);
  // console.log("T_UID", T_UID);

  const renderStep = (step: number) => {
    // Determine the adjusted step when step 2 is hidden
    const adjustedStep =
      numberOfBeneficiaries === 0 && numberOfChildren === 0 && step > 1
        ? step - 1
        : step;

    switch (adjustedStep) {
      case 1:
        return (
          <PersonalInfoStep
            currentStep={currentStep}
            handleStepCompletion={handleStepCompletion}
            numberOfBeneficiaries={numberOfBeneficiaries}
            numberOfAdults={numberOfAdults}
            // numberOfChildren={numberOfChildren}
            aTrip={aTrip}
          />
        );
      case 2:
        return (
          <BeneficiaryInfoStep
            currentStep={currentStep}
            handleStepCompletion={handleStepCompletion}
            showReviewModal={showReviewModal}
            numberOfBeneficiaries={numberOfBeneficiaries}
            numberOfChildren={numberOfChildren}
            numberOfAdults={numberOfAdults}
            aTrip={aTrip}
          />
        );
      case 3:
        return (
          <ReviewDetailsStep
            currentStep={currentStep}
            handleStepCompletion={handleStepCompletion}
            openReview={openReview}
            setOpenReview={setOpenReview}
            showPaymentModal={showPaymentModal}
            aTrip={aTrip}
            numberOfAdults={numberOfAdults}
          />
        );
      case 4:
        return (
          <PaymentStep
            aTrip={aTrip}
            numberOfAdults={numberOfAdults}
            handleStepCompletion={handleStepCompletion}
            openPayment={openPayment}
            setOpenPayment={setOpenPayment}
            title={null}
            refId={T_UID}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setTripDetails({
      ...tripDetails,
      departureSeatNumbers: selectedSeats,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeats]);

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
          <Link
            to="/"
            className="flex items-center text-[#fff] text-[1.2rem] mt-5 md:text-[1.8rem] py-4 "
          >
            <IoIosArrowBack />
            Back
          </Link>

          {isPending ? (
            <div className="flex justify-center items-center h-[30rem]">
              <Spin />
            </div>
          ) : trips && trips.length > 0 ? (
            <div className="bg-[#fff] px-[1.5rem] md:px-[3rem] lg:px-[4rem] pt-[0.5rem] md:pt-[2rem]  pb-10 md:py-28 rounded-[1rem] ">
              <div className="mt-[1rem] flex justify-between gap-[0.8rem] bg-[#fff] lg:mt-[4rem]">
                <div className="flex flex-col gap-[0.8rem]">
                  <div className="flex gap-[0.8rem] items-center lg:mt-[rem]">
                    <CiLocationOn size={28} color="#2F2FC8" />
                    <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                      {oneWayTripPayload && oneWayTripPayload?.from}
                    </p>
                  </div>
                  <div className="flex-col">
                    <TbDotsVertical color="#CCCCCC" size={20} />
                  </div>
                  <div className="flex gap-[0.8rem] items-center">
                    <IoShieldCheckmarkOutline color="#0A8917" size={24} />
                    <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                      {oneWayTripPayload && oneWayTripPayload?.to}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                    {oneWayTripPayload &&
                      oneWayTripPayload?.tripType === "One-way Trip" &&
                      "One-way Trip"}
                  </p>
                  <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                    {oneWayTripPayload && oneWayTripPayload?.adult} Adult
                  </p>
                  <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                    {oneWayTripPayload && oneWayTripPayload?.child} Child
                  </p>
                  <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
                    {oneWayTripPayload && oneWayTripPayload?.date}
                  </p>
                </div>
              </div>
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
                          numberOfBeneficiaries === 0 &&
                          numberOfChildren === 0 &&
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
                                className={`w-[2rem] h-[2rem] md:w-[3.6rem] md:h-[3.6rem] rounded-full border ${
                                  currentStep === filteredStep
                                    ? "border-primaryColor text-primaryColor"
                                    : "border-[#999999] text-[#999999]"
                                } flex justify-center items-center text-[1.2rem] cursor-pointer`}
                              >
                                {index + 1} {/* Display 1, 2, 3 sequence */}
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
                    Select Trip
                  </h4>
                  <div className="flex flex-col gap-[1.6rem] lg:gap-[3.2rem]">
                    {trips &&
                      trips.map((trip, index) => {
                        const availableSeatsCount = trip.seatsAndStatus.filter(
                          (seat) => seat.seatStatus === "available"
                        ).length;
                        return (
                          <SelectTrip
                            key={index}
                            route={`${trip?.from?.terminalName} ==> ${trip?.to?.terminalName}`}
                            carModel={trip?.vehicle?.vehicleName}
                            seatsAvailable={availableSeatsCount}
                            departureTime={trip?.departureDateTime}
                            price={trip?.tripCost}
                            onSelectSeat={() => showModal(trip)}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
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

      <Modal
        className="px-2 md:px-28 lg:px-20 "
        centered
        open={open}
        closable={false}
        title={null}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="md:py-16">
            <div className="text-[2rem] text-center w-full mb-4 font-[700]">
              Select Seat
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
                <img src={steering} alt="car steering image" />
                <div
                  className={`relative ${
                    !seats[0]?.clickable ? "pointer-events-none" : ""
                  } cursor-pointer`}
                  onClick={() =>
                    seats[0]?.clickable && handleSeatClick(seats[0]?.id)
                  }
                >
                  <FaUser size={35} color={seats[0]?.color} />
                  <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {seats[0]?.id}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-10 justify-center">
                {seats.slice(1).map((seat) => (
                  <div
                    key={seat.id}
                    className={`relative mt-[2.4rem] ${
                      !seat.clickable ? "pointer-events-none" : ""
                    } cursor-pointer`}
                    onClick={() => seat.clickable && handleSeatClick(seat.id)}
                  >
                    <FaUser size={35} color={seat.color} />
                    <span className="text-white text-[1.4rem] absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {seat.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              className={`w-full mt-10 h-[4.8rem] text-[1.2rem] lg:text-[1.6rem] font-[500] rounded-[1rem] ${
                selectedSeats.length > 0
                  ? "bg-primaryColor text-[#fff]"
                  : "bg-gray-400 text-[#fff] cursor-not-allowed"
              }`}
              disabled={selectedSeats.length === 0}
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
    </MainLayout>
  );
};

export default TripSearch;
