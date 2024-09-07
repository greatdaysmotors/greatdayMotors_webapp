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
// import { PaymentStep } from "./PaymentStep";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentModal: () => void;
  aTrip?: TripData | null;
  numberOfAdults?: number;
  // setTicketRefId: Dispatch<SetStateAction<string>>;
}

interface TicketResponse {
  isSuccessful: boolean;
  ticketID: string;
  message: string;
  reference: string;
  ref?: string;
}

interface ResponseData {
  // data: {
  //   status: boolean;
  // };
  status: boolean;
  // other properties if necessary
}

interface ConfirmPaymentResponse {
  response: ResponseData;
  message: string;
  ticketUID?: string;
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref: string;

  callback: () => void;
  onClose?: () => void;
}

export const ReviewDetailsStep: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  openReview,
  setOpenReview,
  showPaymentModal,
  aTrip,
  numberOfAdults,
  // setTicketRefId,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = useAuthToken();
  const { setTicketUID } = useStore();

  // console.log("userToken", userToken);

  const tripDetails = useStore((state) => state.tripDetails);
  console.log("tripDetails", tripDetails);

  // const T_UID = useStore((state) => state.ticketUID);
  // console.log("T_UID", T_UID);

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
  const [cancelPaymentModal, setCancelPaymentModal] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReview(false);
    }, 3000);
  };
  // isSuccess

  const amount = tripDetails?.totalTripCost
    ? tripDetails.totalTripCost * 100
    : 0;

  const {
    mutate: confirmPayment,
    isError: cp_error,
    // isPending: cp_pending,
  } = useMutation<
    AxiosResponse<ConfirmPaymentResponse>,
    Error,
    string // Reference type
  >({
    mutationFn: (reference: string) =>
      axios.post<ConfirmPaymentResponse>(
        `${BASE_URL}/v1/paystack/confirm-payment`,
        { reference },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: (response) => {
      console.log("Payment confirmed:", response);
      if (
        response.data.response.status
        // || response.data.response.data.status === "success"
      ) {
        setOpenReview(false);
        handleStepCompletion();
        showPaymentModal();
        if (response.data.ticketUID) {
          setTicketUID(response.data.ticketUID);
        }
      }

      // Navigate to payment success page or show success message
      // navigate(`/payment-success/${response.data.message}`);
    },
    onError: (error) => {
      console.error("Error confirming payment:", error);
    },
  });

  const { mutate, isError, isPending } = useMutation<
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
      const { data } = response;
      console.log("onSuccess_data", data);
      const { ticketID } = data;
      console.log("ticketID", ticketID);

      const handler = window.PaystackPop.setup({
        key: "pk_test_7b253d342edfc96c63da319728cacdf4c862a559",
        email: tripDetails?.email || "",
        amount: amount, // Amount is in kobo
        currency: "NGN",
        ref: ticketID,
        callback: () => {
          // Confirm the payment with the reference
          confirmPayment(ticketID);
        },
        onClose: () => {
          console.log("Payment process was closed.");
          setCancelPaymentModal(true);
        },
      } as PaystackOptions);

      handler.openIframe();
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

  const handlePaymentModalCancel = () => {
    setCancelPaymentModal(false);
  };

  console.log("isError", isError);

  const handleHome = () => {
    navigate("/"); // Navigate to the home page
    setCancelPaymentModal(false); // Close the modal
  };

  return (
    <div>
      {cancelPaymentModal ? (
        <Modal
          className="custom-modal2"
          open={cancelPaymentModal}
          onCancel={() => setCancelPaymentModal(false)}
          closable={false}
          centered
          footer={[
            <Button
              key="ok"
              type="primary"
              onClick={handleHome}
              className="px-10 py-8 text-[1.6rem] bg-primaryColor text-white rounded-[1rem] relative"
            >
              Home
            </Button>,
          ]}
        >
          <MdClose
            className="absolute top-4 right-1 cursor-pointer"
            size={30}
            onClick={handlePaymentModalCancel}
          />
          <div className="flex flex-col justify-center gap-4 items-center ">
            <h4 className="text-[1.8rem] md:text-[2.5rem] leading-[35px] font-[700] text-center ">
              Payment has been cancelled!
            </h4>
            <p className="text-[1.6rem] md:text-[2rem] font-[500] text-center">
              Thank you for choosing Greatday Motors.
            </p>
          </div>
        </Modal>
      ) : (
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
              {isError ||
                (cp_error && (
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
                ))}
              {/* {isSuccess && (
            <Alert
              message="Success Message"
              description={`${
                "Successful"
                // err.response.data?.errorMessage || "An Error Occurred"
              }`}
              type="success"
              showIcon
              className="mt-2"
            />
          )} */}
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
                {oneWayTripPayload?.child
                  ? `${oneWayTripPayload.child} Child`
                  : ""}
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
              <p className="text-[1.4rem] md:text-[1.6rem]  ">
                Passenger’s Name
              </p>
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
                  ? tripDetails.departureSeatNumbers.map(
                      (seatNumber, index) => (
                        <span key={index}>
                          {index > 0 && ", "}Seat {seatNumber}
                        </span>
                      )
                    )
                  : "Nil"}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
              Next-of-Kin Information
            </h2>
            <div className="flex justify-between">
              <p className="text-[1.4rem] md:text-[1.6rem] ">
                Next-of-Kin Name
              </p>
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
            {tripDetails.beneficiaries &&
            tripDetails.beneficiaries.length > 0 ? (
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
                    <p className="text-[1.4rem] md:text-[1.6rem]">
                      Phone Number
                    </p>
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
              <p className="text-[1.4rem] md:text-[1.6rem]">No beneficiaries</p>
            )}
          </div>

          <div>
            <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
              Children
            </h2>

            {tripDetails.child1Name ||
            tripDetails.child1Age ||
            tripDetails.child2Name ||
            tripDetails.child2Age ? (
              <>
                {/* Child 1 Details */}
                {(tripDetails.child1Name || tripDetails.child1Age) && (
                  <div className="flex justify-between">
                    <p className="text-[1.4rem] md:text-[1.6rem]">
                      Child 1 Name
                    </p>
                    <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
                      {`${tripDetails.child1Name || "Nil"} | ${
                        tripDetails.child1Age || "Nil"
                      }`}
                    </p>
                  </div>
                )}

                {/* Child 2 Details */}
                {(tripDetails.child2Name || tripDetails.child2Age) && (
                  <div className="flex justify-between">
                    <p className="text-[1.4rem] md:text-[1.6rem]">
                      Child 2 Name
                    </p>
                    <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
                      {`${tripDetails.child2Name || "Nil"} | ${
                        tripDetails.child2Age || "Nil"
                      }`}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-[1.4rem] md:text-[1.6rem]">No Children</p>
            )}
          </div>

          <hr className="my-[1.6rem]" />
          <div className="mt-4 flex flex-col justify-start items-start">
            <div className="flex flex-col gap-1">
              {/* <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">
            Adult Fare: ₦
            {(aTrip &&
              numberOfAdults &&
              (aTrip.tripCost * numberOfAdults).toLocaleString()) ||
              "Nil"}
          </p> */}
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
      )}
    </div>
  );
};
