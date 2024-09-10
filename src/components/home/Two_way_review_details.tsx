import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  pay_reference_v2,
  round_trip_post_data_type,
  storeState,
  terminal_v2,
} from "../../types/Trip";
import { Alert, Button, Modal, Spin } from "antd";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { use_round_trip } from "../../store/round_trip";
import { usePaystackPayment } from "react-paystack";

// import { InfoStepProps } from "../../types/InfoTypes";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentModal: () => void;
  numberOfChildren?: number;
  numberOfBeneficiaries?: number;
  numberOfAdults: number;
  the_trip_cost: number;
  departure_trip_cost: number;
  return_trip_cost: number;
}

interface TicketResponse {
  ticketID: string;
  amount: number;
  email: string;
}

export const Two_way_review_details: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  openReview,
  setOpenReview,
  showPaymentModal,
  // numberOfChildren,
  the_trip_cost,
  numberOfAdults,
  departure_trip_cost,
  return_trip_cost,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = useAuthToken();

  console.log("userToken", userToken);

  const tripDetails = use_round_trip((state) => state.round_trip_post_data);
  const setTripDetails = use_round_trip(
    (state) => state.set_round_trip_post_data
  );
  const setPaymentRef = use_round_trip((state) => state.set_payment_ref_id);
  const paymentRef = use_round_trip((state) => state.payment_ref_id);

  useEffect(() => {
    setTripDetails({
      ...tripDetails,
      totalTripCost: the_trip_cost * numberOfAdults,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOk = () => {
    HandlePayStack();
  };

  const onSuccess = (reference: pay_reference_v2) => {
    confirm_mutate({
      reference: reference.reference,
    });
    setPaymentRef({
      ...paymentRef,
      ref_id: reference.reference,
    });
  };

  const onClose = () => {
    console.log("closed");
  };

  const { mutate, isError, isPending } = useMutation<
    AxiosResponse<TicketResponse>, // Success type
    Error, // Error type
    round_trip_post_data_type // Payload type
  >({
    mutationFn: (payload: round_trip_post_data_type) =>
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
      console.log("onSuccess_response_v88", response);
      const the_value = response.data.ticketID;
      // const the_value = "webooooooo"
      const config = {
        reference: the_value,
        // reference: String(response.data.ticketID),
        email: tripDetails.email,
        amount: the_trip_cost * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: "pk_test_7b253d342edfc96c63da319728cacdf4c862a559",
      };

      const initializePayment = usePaystackPayment(config);
      initializePayment({ onSuccess, onClose });
    },
    onError: (error) => {
      // setErr(error);
      console.error("Error creating ticket:", error);
    },
  });

  const HandlePayStack = () => {
    if (!userToken) {
      navigate("/login", {
        state: {
          from: location.pathname,
          tripDetails,
          modalOpen: true,
        },
      });
    } else {
      mutate(tripDetails);
      console.log(tripDetails);
      //  handleStepCompletion();
      // showPaymentModal();
    }
  };

  const handleCancel = () => {
    setOpenReview(false);
  };

  // console.log("isError", isError);
  const trip_data = use_round_trip((state: storeState) => state.trip_data);

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

  // const { data, error, isLoading } = useQuery({
  const { data } = useQuery({
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

        const departure_terminal_name = terminal_list?.find(
          (item: terminal_v2) => {
            return item._id === trip_data.departure_terminal;
          }
        );
        console.log(
          departure_terminal_name?.terminalName,
          departure_terminal_name?.terminalAddress,
          "we wewewwe"
        );
        set_terminal_a(
          `${departure_terminal_name?.terminalName}, ${departure_terminal_name?.terminalAddress}`
        );

        const arrival_terminal_name = terminal_list?.find(
          (item: terminal_v2) => {
            return item._id === trip_data.arrival_terminal;
          }
        );
        set_terminal_b(
          `${arrival_terminal_name?.terminalName}, ${arrival_terminal_name?.terminalAddress}`
        );
      }
    }
  }, [data]);

  interface confirm_payment_type {
    reference: string;
  }

  // const { mutate:confirm_mutate, isError:confirm_error, isPending:confirm_isPending } = useMutation<
  const { mutate: confirm_mutate, isPending: confirm_isPending } = useMutation<
    AxiosResponse, // Success type
    Error, // Error type
    confirm_payment_type // Payload type
  >({
    mutationFn: (payload: confirm_payment_type) =>
      axios.post(`${BASE_URL}/v1/paystack/confirm-payment`, payload, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
    onSuccess: () => {
      // console.log(response)
      handleStepCompletion();
      showPaymentModal();
    },
    onError: (error) => {
      // setErr(error);
      console.error("Error confirming ticket:", error);
    },
  });

  return (
    <div>
      <Modal
        className="custom-modal"
        // loading={loading}
        open={openReview}
        closable={false}
        title={null}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="mt-4 flex flex-col ">
            {currentStep <= 4 && (
              <>
                <Button
                  key="submit"
                  type="primary"
                  className={`px-10 py-8 text-[1.6rem] bg-primaryColor text-white rounded-[1rem] relative`}
                  disabled={isPending || confirm_isPending} // Disable button while pending
                  onClick={handleOk}
                >
                  {isPending || confirm_isPending ? (
                    <Spin size="small" />
                  ) : isError ? (
                    "Error while creating ticket"
                  ) : (
                    "Pay with PayStack"
                  )}
                </Button>
              </>
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
                {terminal_a || "Nil"}
              </p>
            </div>
            <div className="flex-col">
              <TbDotsVertical color="#CCCCCC" size={20} />
            </div>
            <div className="flex gap-[0.8rem] items-center">
              <IoShieldCheckmarkOutline color="#0A8917" size={24} />
              <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                {terminal_b || "Nil"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              Round trip
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
              {trip_data.departure_date || "Nil"}
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
              {/* {(departure_trip_cost.toLocaleString() .toLocaleString(), return_trip_cost.toLocaleString() .toLocaleString() )|| */}
              {Number(departure_trip_cost).toLocaleString().toLocaleString() ||
                "Nil"}
              ,
              {Number(return_trip_cost).toLocaleString().toLocaleString() ||
                "Nil"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]">Departure Seat(s)</p>
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
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]">Arrival Seat(s)</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              {tripDetails?.returnSeatNumbers?.length
                ? tripDetails.returnSeatNumbers.map((seatNumber, index) => (
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
          {trip_data.number_of_children === 0 ? (
            <p className="text-[1.4rem] md:text-[1.6rem]">No children added</p>
          ) : (
            <>
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

                {trip_data.number_of_children === 1 ? (
                  "No child"
                ) : (
                  <p className="text-[1.4rem] md:text-[1.6rem] font-[600] capitalize">
                    {`${tripDetails.child2Name || "Nil"} | ${
                      tripDetails.child2Age || "Nil"
                    } `}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <hr className="my-[1.6rem]" />
        <div className="mt-4 flex flex-col justify-start items-start">
          <div className="flex flex-col gap-1">
            <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">
              Total Fare: ₦
              {(the_trip_cost * numberOfAdults)
                .toLocaleString()
                .toLocaleString() || "Nil"}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
