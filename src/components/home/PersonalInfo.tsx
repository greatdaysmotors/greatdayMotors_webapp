import { Alert, Button, Input, Spin } from "antd";
import useStore from "../../store";
import { TripData } from "../../types/Trip";
import { useCallback, useEffect, useState } from "react";
import { useUserProfile } from "@hooks/useUserProfile";
import useAuthToken from "@hooks/useAuthToken";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  numberOfBeneficiaries?: number;
  numberOfAdults?: number;
  numberOfChildren?: number;
  aTrip?: TripData | null;
}

export const PersonalInfoStep: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  numberOfAdults,
  aTrip,
}) => {
  const userToken = useAuthToken();

  const { data, error, isLoading } = useUserProfile(userToken);
  const [showSpinner, setShowSpinner] = useState(false);

  const tripDetails = useStore((state) => state.tripDetails);
  console.log("tripDetails", tripDetails);

  const setTripDetails = useStore((state) => state.setTripDetails);

  useEffect(() => {
    if (aTrip && data && !isLoading && !error) {
      setTripDetails({
        ...tripDetails,
        totalTripCost: aTrip.tripCost,
        fullName: data.userProfile?.fullName || "",
        email: data.userProfile?.email || "",
        phoneNumber: data.userProfile?.phoneNumber || "",
        nextOfKinName: data.userProfile?.nokFullName || "",
        nextOfKinPhoneNumber: data.userProfile?.nokPhoneNumber || "",
        nextOfKinEmail: data.userProfile?.nokEmail || "",
        sendEmailToNextOfKin: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aTrip, data, isLoading, error]);

  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
    } else {
      const timer = setTimeout(() => setShowSpinner(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripDetails({
      ...tripDetails,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripDetails({
      ...tripDetails,
      sendEmailToNextOfKin: e.target.checked,
    });
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Define isFormValid using useCallback
  const isFormValid = useCallback((): boolean => {
    return (
      Boolean(tripDetails.fullName) &&
      Boolean(tripDetails.email) &&
      Boolean(tripDetails.phoneNumber) &&
      Boolean(tripDetails.nextOfKinName) &&
      Boolean(tripDetails.nextOfKinEmail) &&
      Boolean(tripDetails.nextOfKinPhoneNumber)
    );
  }, [tripDetails]);

  // useEffect with the dependency on isFormValid
  useEffect(() => {
    setIsButtonEnabled(isFormValid());
  }, [tripDetails, isFormValid]);

  return (
    <form className="flex flex-col mt-3">
      {error && (
        <Alert
          message="Error"
          description="There was an issue fetching your profile information. Please try again later."
          type="error"
          showIcon
        />
      )}

      <div className="md:flex md:gap-[2.4rem]">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
            Personal Information
          </h2>
          <div className="w-full flex flex-col gap-[1.6rem]">
            <label
              htmlFor="fullName"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Passenger’s Name
              <Input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={tripDetails.fullName}
                onChange={handleInputChange}
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
                suffix={showSpinner ? <Spin size="small" /> : null}
              />
            </label>
            <label
              htmlFor="email"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Passenger’s Email
              <Input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={tripDetails.email}
                onChange={handleInputChange}
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
                suffix={showSpinner ? <Spin size="small" /> : null}
              />
            </label>

            <label
              htmlFor="phoneNumber"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Passenger’s Phone Number
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={tripDetails.phoneNumber}
                onChange={handleInputChange}
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
                suffix={showSpinner ? <Spin size="small" /> : null}
              />
            </label>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-8 lg:mt-0">
          <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
            Next-of-Kin Information
          </h2>
          <div className="w-full flex flex-col gap-[1.6rem]">
            <label
              htmlFor="nextOfKinName"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Next-of-Kin's Name
              <Input
                type="text"
                name="nextOfKinName"
                placeholder="Enter their name"
                value={tripDetails.nextOfKinName}
                onChange={handleInputChange}
                suffix={showSpinner ? <Spin size="small" /> : null}
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>

            <label
              htmlFor="nextOfKinEmail"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Next-of-Kin's Email
              <Input
                type="text"
                name="nextOfKinEmail"
                placeholder="Enter their email"
                value={tripDetails.nextOfKinEmail}
                onChange={handleInputChange}
                suffix={showSpinner ? <Spin size="small" /> : null}
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>

            <label
              htmlFor="nextOfKinPhoneNumber"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Next-of-Kin's Phone Number
              <Input
                type="text"
                name="nextOfKinPhoneNumber"
                placeholder="Enter their phone number"
                value={tripDetails.nextOfKinPhoneNumber}
                onChange={handleInputChange}
                suffix={showSpinner ? <Spin size="small" /> : null}
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>
          </div>
        </div>
      </div>

      <p className="text-[1.4rem] md:text-[1.8rem] mt-4  text-[#999999]">
        N/B: Please tick the box if you want your next-of-kin to get
        notification about the trip
      </p>

      <div className="flex  mt-3 gap-2 ">
        <Input
          type="checkbox"
          className="rounded-[1rem] border w-[2rem]"
          checked={tripDetails.sendEmailToNextOfKin}
          onChange={handleCheckboxChange}
        />
        <span className="text-[1.4rem] md:text-[1.8rem]  leading-[1.5rem] w-full">
          I want my next-of-kin to receive an email about the trip.
        </span>
      </div>

      <hr className="my-[1.6rem]" />
      <div className="mt-4 flex flex-col justify-end items-end">
        <div className="flex flex-col gap-1">
          {numberOfAdults && (
            <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
              Total Fare: ₦
              {aTrip && (aTrip.tripCost * numberOfAdults).toLocaleString()}
            </p>
          )}

          {currentStep <= 4 && (
            <Button
              key="submit"
              type="primary"
              onClick={handleStepCompletion}
              className={`px-10 py-4 md:py-8 bg-primaryColor text-white rounded-[1rem] `}
              disabled={!isButtonEnabled}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
