import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { TripData } from "../../types/Trip";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";

interface PaymentStepProps {
  handleStepCompletion?: () => void;
  openPayment?: boolean;
  setOpenPayment?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: ReactNode;
  content?: ReactNode;
  footerContent?: ReactNode;
  loading?: boolean;
  refId?: string | null;
  aTrip?: TripData | null;
  numberOfAdults?: number;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  // handleStepCompletion,
  openPayment,
  setOpenPayment,
  title,
  content,
  footerContent,
  // loading = false,
  refId,
  aTrip,
  numberOfAdults,
}) => {
  const nav = useNavigate();
  const oneWayTripPayload = useStore((state) => state.oneWayTripPayload);
  const tripDetails = useStore((state) => state.tripDetails);
  const [viewDetails, setViewDetails] = useState(false);

  const handleOk = () => {
    if (setOpenPayment) {
      setOpenPayment(false);
    }
  };

  const handleCancel = () => {
    if (setOpenPayment) {
      setOpenPayment(false);
    }
  };

  const HandleViewDetails = () => {
    setViewDetails(true);
  };

  const HandlePrint = () => {
    window.print();
  };

  const HandleViewDetailsCancel = () => {
    setViewDetails(false);
    if (setOpenPayment) {
      setOpenPayment(false);
    }
    nav("/");
  };

  const GoHome = () => {
    nav("/");
  };

  return (
    <div>
      {viewDetails ? (
        <Modal
          // className="custom-modal"
          // loading={loading}
          open={viewDetails}
          closable={false}
          title={null}
          // onOk={handleOk}
          onCancel={HandleViewDetailsCancel}
          footer={[
            <div className="mt-4 flex flex-col ">
              <Button
                key="submit"
                type="primary"
                onClick={HandlePrint}
                className={`px-10 py-8 text-[1.6rem] bg-primaryColor text-white rounded-[1rem] relative`}
                // disabled={isPending} // Disable button while pending
              >
                Print Now
              </Button>
            </div>,
          ]}
        >
          <MdClose
            className="absolute top-4 right-1 cursor-pointer"
            size={30}
            onClick={HandleViewDetailsCancel}
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
                {(oneWayTripPayload && oneWayTripPayload?.child) || "No"} Child
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
              <p className="text-[1.4rem] md:text-[1.6rem]">
                No beneficiaries added
              </p>
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
      ) : (
        <Modal
          className="h-[100rem]"
          open={openPayment}
          closable={false}
          title={title}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            footerContent ? (
              footerContent
            ) : (
              <div className="mt-4 flex flex-col gap-[1rem] justify-center w-[80%] mx-auto items-center py-36">
                <IoIosCheckmarkCircleOutline
                  size={80}
                  color="#0A8917"
                  className="flex lg:hidden"
                />
                <IoIosCheckmarkCircleOutline
                  size={120}
                  color="#0A8917"
                  className="hidden lg:flex"
                />
                <h4 className="text-[1.8rem] md:text-[2rem] font-[700] text-center lg:w-[30rem]">
                  Your booking reservation is Successful
                </h4>
                <p className="text-[1.6rem] md:text-[1.8rem] font-[500] text-center">
                  Thank you for choosing Greatday Motors. Kindly be at the
                  terminal 30 minutes before vehicle take off time.
                </p>
                {refId && (
                  <h4 className="text-[1.6rem] md:text-[1.8rem] font-[700] text-center">
                    Ref ID: {refId}
                  </h4>
                )}
                <div className="flex flex-col gap-4">
                  <Button
                    key="submit"
                    type="primary"
                    onClick={HandleViewDetails}
                    className={`px-10 mt-4 py-8 bg-primaryColor text-white rounded-[1rem] w-full`}
                  >
                    View Trip Details
                  </Button>
                  <Button
                    key="submit"
                    type="primary"
                    onClick={GoHome}
                    className={`px-10 mt-4 py-8 bg-white text-black rounded-[1rem] w-full`}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            )
          }
        >
          {content}
          <MdClose
            className="absolute top-4 right-1 md:right-10 md:top-8 cursor-pointer"
            size={30}
            onClick={handleCancel}
          />
        </Modal>
      )}
    </div>
  );
};
