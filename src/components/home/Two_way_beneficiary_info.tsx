import { Button, Input } from "antd";
import {  storeState } from "../../types/Trip";
import { use_round_trip } from "../../store/round_trip";
import { useEffect } from "react";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  showReviewModal: () => void;
  numberOfChildren?: number;
  numberOfBeneficiaries?: number;
  numberOfAdults?: number;

}

export const Two_way_beneficiary_info: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  showReviewModal,

}) => {
  const TripDetails = use_round_trip(
    (state) => state.round_trip_post_data
  );
  useEffect(()=>{
console.log(TripDetails," original data alabi")
  },[])

    // GETTING ROUNDTRIP FORM DATA FROM STORE
    const tripDetails = use_round_trip((state: storeState) => state.trip_data);
    const ticketDetails = use_round_trip((state: storeState) => state.round_trip_post_data);

  const numberOfChildren = tripDetails.number_of_children;
  const numberOfAdults = tripDetails.number_of_adults;
  const numberOfBeneficiaries = numberOfAdults > 1 ? numberOfAdults - 1 : 0;

 

  const HandleClick = () => {
    handleStepCompletion();
    showReviewModal();
  };

  const renderChildrenFields = () => {
    const childrenFields = [];

    for (let i = 0; i < numberOfChildren; i++) {
      childrenFields.push(
        <div key={i} className="w-full flex flex-col gap-[1.6rem] mt-8 ">
          <label
            htmlFor={`child-name-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Child {i + 1}'s Name
            <Input
              type="text"
              placeholder="Enter child's name"
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
          <label
            htmlFor={`child-age-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Child {i + 1}'s Age
            <Input
              type="text"
              placeholder="Enter child's age"
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
  
        </div>
      );
    }

    return childrenFields;
  };

  const renderBeneficiaryForms = () => {
    const beneficiaryForms = [];

    for (let i = 0; i < numberOfBeneficiaries + 1; i++) {
      beneficiaryForms.push(
        <div key={i} className="w-full flex flex-col gap-[1.6rem] mt-8">
          <label
            htmlFor={`beneficiary-name-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Beneficiary {i + 1}'s Name
            <Input
              type="text"
              placeholder={`Enter Beneficiary ${i + 1}'s name`}
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
          <label
            htmlFor={`beneficiary-phone-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Beneficiary {i + 1}'s Phone Number
            <Input
              type="text"
              placeholder={`Enter Beneficiary ${i + 1}'s phone number`}
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
          <label
            htmlFor={`beneficiary-email-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Beneficiary {i + 1}'s Email
            <Input
              type="text"
              placeholder={`Enter Beneficiary ${i + 1}'s email`}
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>

        </div>
      );
    }

    return beneficiaryForms;
  };

  return (
    <form>
      <div className="flex flex-col mt-3">
        <div className="md:flex md:gap-[2.4rem]">
          {numberOfBeneficiaries > 0 && (
            <h2 className="text-[1.4rem] md:text-[2.2rem] font-[700]">
              Beneficiary Information
            </h2>
          )}

          {renderBeneficiaryForms()}

          {numberOfChildren > 0 && numberOfBeneficiaries > 0 && (
            <hr className="my-4 md:hidden" />
          )}

          {numberOfChildren > 0 && renderChildrenFields()}
        </div>

        {numberOfChildren > 0 && numberOfBeneficiaries > 0 && (
          <hr className="mb-[2.5rem] mt-[3rem]" />
        )}

        <div className="mt-4 flex flex-col justify-end items-end">
          {numberOfChildren > 0 || numberOfBeneficiaries > 0 ? (
            <div className="flex flex-col gap-1">
              {numberOfAdults > 0 && (
                <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
                  Adult Fare: ₦
                  {ticketDetails.totalTripCost.toLocaleString()}
                </p>
              )}
              {/* {numberOfChildren > 0 && (
                <p className="text-[1.4rem] md:text-[1.8rem] font-[500]">
                  Child Fare: ₦9,100
                </p>
              )} */}
              <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
                Total Fare: ₦
                {ticketDetails.totalTripCost.toLocaleString()}
              </p>

              {currentStep <= 4 && (
                <Button
                  key="submit"
                  type="primary"
                  onClick={HandleClick}
                  className="px-10 py-4 md:py-8 bg-primaryColor text-white rounded-[1rem]"
                >
                  Continue
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {currentStep <= 4 && (
                <Button
                  key="submit"
                  type="primary"
                  onClick={HandleClick}
                  className="px-10 py-4 md:py-8 bg-primaryColor text-white rounded-[1rem]"
                >
                  View Details
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
