import { Alert, Button, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import useStore, { TripDetails } from "../../store";
import { TripData } from "../../types/Trip";
import useAuthToken from "@hooks/useAuthToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@api/index";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentModal: () => void;
  aTrip?: TripData | null;
  numberOfAdults?: number;
}

interface TicketResponse {
  ticketId: string;
  amount: number;
  email: string;
}

export const ReviewDetailsStep: React.FC<InfoStepProps> = ({
  // handleStepCompletion,
  currentStep,
  openReview,
  setOpenReview,
  // showPaymentModal,
  aTrip,
  numberOfAdults,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = useAuthToken();

  console.log("userToken", userToken);

  const tripDetails = useStore((state) => state.tripDetails);
  console.log("tripDetails", tripDetails);

  const setTripDetails = useStore((state) => state.setTripDetails);

  useEffect(() => {
    if (aTrip && numberOfAdults) {
      setTripDetails({
        ...tripDetails,
        totalTripCost: aTrip.tripCost * numberOfAdults,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aTrip, numberOfAdults]);

  const oneWayTripPayload = useStore((state) => state.oneWayTripPayload);

  console.log("aTrip", aTrip);

  const [loading, setLoading] = useState(false);
  // const [err, setErr] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReview(false);
    }, 3000);
  };
// isSuccess
  const { mutate, isError, isPending,  } = useMutation<
    AxiosResponse<TicketResponse>, // Success type
    Error, // Error type
    TripDetails // Payload type
  >({
    mutationFn: (payload: TripDetails) =>
      axios.post<TicketResponse>(
        `${BASE_URL}/v1/passenger/book-a-ticket`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: (response) => {
      console.log("onSuccess_response", response);

      // const { data } = response;
      // const { ticketId, amount, email } = data;

      // const handler = window.PaystackPop.setup({
      //   key: "pk_test_7b253d342edfc96c63da319728cacdf4c862a559",
      //   email: email,
      //   amount: amount * 100, // Amount is in kobo
      //   currency: "NGN",
      //   ref: ticketId, // This should be a unique reference to the ticket
      //   callback: (response) => {
      //     console.log("callback_response", response);
      //     // navigate(`/payment-success/${response.reference}`);
      //   },
      //   onClose: () => {
      //     console.log("Payment process was closed.");
      //   },
      // });
      // handler.openIframe();
    },
    onError: (error) => {
      // setErr(error);
      console.error("Error creating ticket:", error);
    },
  });

  const HandlePayStack = () => {
    if (!userToken) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      mutate(tripDetails);
      //  handleStepCompletion();
      // showPaymentModal();
    }
  };

  const handleCancel = () => {
    setOpenReview(false);
  };

  console.log("isError", isError);

  return (
    <div>
      <Modal
        className="custom-modal"
        loading={loading}
        open={openReview}
        closable={false}
        title={null}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="mt-4 flex flex-col ">
            {currentStep <= 4 && (
              <Button
                key="submit"
                type="primary"
                onClick={HandlePayStack}
                className={`px-10 py-8 text-[1.6rem] bg-primaryColor text-white rounded-[1rem] relative`}
                disabled={isPending} // Disable button while pending
              >
                {isPending ? <Spin size="small" /> : "Pay with Paystack"}
              </Button>
            )}
            {isError && (
              <Alert
                message="Error Message"
                description={`${
                  "An error occurred"
                  // err.response.data?.errorMessage || "An Error Occurred"
                }`}
                type="error"
                showIcon
                className="mt-2"
              />
            )}
          </div>,
        ]}
      >
        <MdClose
          className="absolute top-4 right-1 cursor-pointer"
          size={30}
          onClick={handleCancel}
        />
        <div className="mt-[1rem] flex justify-between gap-[0.8rem] bg-[#fff] lg:mt-[4rem]">
          <div className="flex flex-col gap-[0.8rem]">
            <div className="flex gap-[0.8rem] items-center lg:mt-[rem]">
              <CiLocationOn size={28} color="#2F2FC8" />
              <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                {aTrip?.from?.terminalName || "Nil"}
              </p>
            </div>
            <div className="flex-col">
              <TbDotsVertical color="#CCCCCC" size={20} />
            </div>
            <div className="flex gap-[0.8rem] items-center">
              <IoShieldCheckmarkOutline color="#0A8917" size={24} />
              <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                {aTrip?.to?.terminalName || "Nil"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              {(oneWayTripPayload &&
                oneWayTripPayload?.tripType === "One-way Trip" &&
                "One-way Trip") ||
                "Nil"}
            </p>
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              {(oneWayTripPayload && oneWayTripPayload?.adult) || "Nil"} Adult
            </p>
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              {(oneWayTripPayload && oneWayTripPayload?.child) || "Nil"} Child
            </p>
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              {(oneWayTripPayload && oneWayTripPayload?.date) || "Nil"}
            </p>
          </div>
        </div>

        <h2 className="text-[1.6rem] md:text-[2rem] lg:text-[2.2rem] font-[700] mt-[2rem]">
          Information Summary
        </h2>

        <div>
          <h2 className="text-[1.4rem] md:text-[1.8rem]  font-[700] mt-[2rem]">
            Passenger Information
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]  ">Passenger’s Name</p>
            <p className="text-[1.4rem] font-[600] capitalize">
              {tripDetails.fullName || "Nil"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Phone Number</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              {tripDetails.phoneNumber || "Nil"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Email</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              {tripDetails.email || "Nil"}
            </p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Gender</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">{tripDetails.gender || "nill"}</p>
          </div> */}
        </div>
        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Trip Information
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Price</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              ₦
              {(aTrip && numberOfAdults && aTrip.tripCost.toLocaleString()) ||
                "Nil"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]">Seat(s)</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              {tripDetails?.departureSeatNumbers?.length
                ? tripDetails.departureSeatNumbers.map((seatNumber, index) => (
                    <span key={index}>
                      {index > 0 && ", "}Seat {seatNumber}
                    </span>
                  ))
                : "Nil"}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Next-of-Kin Information
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Next-of-Kin Name</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
              {tripDetails.nextOfKinName || "Nil"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Phone Number</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              {tripDetails.nextOfKinPhoneNumber || "Nil"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Email</p>
            <p className="text-[1.4rem font-[600]">
              {" "}
              {tripDetails.nextOfKinEmail || "Nil"}
            </p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Gender</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">Female</p>
          </div> */}
        </div>
        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Beneficiaries Information
          </h2>
          {tripDetails.beneficiaries && tripDetails.beneficiaries.length > 0 ? (
            tripDetails.beneficiaries.map((beneficiary, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <p className="text-[1.4rem] md:text-[1.6rem]">
                    Beneficiary {index + 1} Name
                  </p>
                  <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
                    {beneficiary.name || "Nil"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[1.4rem] md:text-[1.6rem]">Phone Number</p>
                  <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
                    {beneficiary.phoneNumber || "Nil"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[1.4rem] md:text-[1.6rem]">Email</p>
                  <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
                    {beneficiary.email || "Nil"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[1.4rem] md:text-[1.6rem]">
              No beneficiaries added
            </p>
          )}
        </div>

        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Children
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]">Child 1 Name</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
              {`${tripDetails.child1Name || "Nil"} | ${
                tripDetails.child1Age || "Nil"
              }`}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]">Child 2 Name</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
              {`${tripDetails.child2Name || "Nil"} | ${
                tripDetails.child2Age || "Nil"
              } `}
            </p>
          </div>
        </div>
        <hr className="my-[1.6rem]" />
        <div className="mt-4 flex flex-col justify-start items-start">
          <div className="flex flex-col gap-1">
            <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">
              Adult Fare: ₦
              {(aTrip &&
                numberOfAdults &&
                (aTrip.tripCost * numberOfAdults).toLocaleString()) ||
                "Nil"}
            </p>
            {/* <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">
              Child Fare: ₦9,100
            </p> */}
            <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">
              Total Fare: ₦
              {(aTrip &&
                numberOfAdults &&
                (aTrip.tripCost * numberOfAdults).toLocaleString()) ||
                "Nil"}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
