import { Button, Input } from "antd";
import {  beneficiaries, storeState } from "../../types/Trip";
import { use_round_trip } from "../../store/round_trip";
import { useEffect } from "react";
import { Beneficiary } from "../../store/index";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  showReviewModal: () => void;
  numberOfChildren: number;
  numberOfBeneficiaries: number;
  numberOfAdults: number;

}

export const Two_way_beneficiary_info: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  showReviewModal,
  numberOfChildren,
  numberOfBeneficiaries,
  numberOfAdults,
}) => {
  const TripDetails = use_round_trip(
    (state) => state.round_trip_post_data
  );
  const setTripDetails = use_round_trip(
    (state) => state.set_round_trip_post_data
  );
  useEffect(()=>{
console.log(TripDetails," original data alabi")
  },[])

    // GETTING ROUNDTRIP FORM DATA FROM STORE
    // const tripDetails = use_round_trip((state: storeState) => state.trip_data);
    const ticketDetails = use_round_trip((state: storeState) => state.round_trip_post_data);

  // const numberOfChildren = tripDetails.number_of_children;
  // const numberOfAdults = tripDetails.number_of_adults;
  // const numberOfBeneficiaries = numberOfAdults > 1 ? numberOfAdults - 1 : 0;

 

  const HandleClick = () => {
    
    handleStepCompletion();
    showReviewModal();
    console.log(TripDetails,"no be lie")
  };



  // Handler to update children information
  const handleChildChange = (
    index: number,
    field: "Name" | "Age",
    value: string
  ) => {
    switch (index) {
      case 0:
        setTripDetails({
          ...TripDetails,
          [`child1${field}`]: value,
        });
        break;
      case 1:
        setTripDetails({
          ...TripDetails,
          [`child2${field}`]: value,
        });
        break;
      default:
        console.error("Invalid child index");
    }
  };



  // Synchronize beneficiaries array with numberOfBeneficiaries
  useEffect(() => {
    const currentBeneficiaries = TripDetails.beneficiaries || [];
    if (currentBeneficiaries.length < numberOfBeneficiaries) {
      const additionalBeneficiaries: Beneficiary[] = Array.from(
        { length: numberOfBeneficiaries - currentBeneficiaries.length },
        () => ({ name: "", email: "", phoneNumber: "" })
      );
      setTripDetails({
        ...TripDetails,
        beneficiaries: [...currentBeneficiaries, ...additionalBeneficiaries],
      });
    } else if (currentBeneficiaries.length > numberOfBeneficiaries) {
      setTripDetails({
        ...TripDetails,
        beneficiaries: currentBeneficiaries.slice(0, numberOfBeneficiaries),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfBeneficiaries]);







  const handleBeneficiaryChange = (
    index: number,
    field: keyof Beneficiary,
    value: string
  ) => {
    const updatedBeneficiaries = [...(TripDetails.beneficiaries || [])];
    if (updatedBeneficiaries[index]) {
      updatedBeneficiaries[index] = {
        ...updatedBeneficiaries[index],
        [field]: value,
      };
      setTripDetails({
        ...TripDetails,
        beneficiaries: updatedBeneficiaries,
      });
    }
  };





  // Render children input fields
  const renderChildrenFields = () => {
    const childrenFields = [];

    for (let i = 0; i < numberOfChildren; i++) {
      const name = i === 0 ? TripDetails.child1Name : TripDetails.child2Name;
      const age = i === 0 ? TripDetails.child1Age : TripDetails.child2Age;

      childrenFields.push(
        <div key={i} className="w-full flex flex-col gap-[1.6rem] mt-8">
          <label
            htmlFor={`child-name-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Child {i + 1}'s Name
            <Input
              id={`child-name-${i}`}
              type="text"
              name={`child${i + 1}Name`}
              value={name || ""}
              onChange={(e) => handleChildChange(i, "Name", e.target.value)}
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
              id={`child-age-${i}`}
              type="text"
              name={`child${i + 1}Age`}
              value={age || ""}
              onChange={(e) => handleChildChange(i, "Age", e.target.value)}
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


    return (
      TripDetails.beneficiaries?.map((beneficiary:beneficiaries, index:number) => (
        <div key={index} className="w-full flex flex-col gap-[1.6rem] mt-8">
          <label
            htmlFor={`beneficiary-name-${index}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Beneficiary {index + 1}'s Name
            <Input
              id={`beneficiary-name-${index}`}
              type="text"
              value={beneficiary.name}
              onChange={(e) =>
                handleBeneficiaryChange(index, "name", e.target.value)
              }
              placeholder={`Enter Beneficiary ${index + 1}'s name`}
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
          <label
            htmlFor={`beneficiary-phone-${index}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Beneficiary {index + 1}'s Phone Number
            <Input
              id={`beneficiary-phone-${index}`}
              type="text"
              value={beneficiary.phoneNumber}
              onChange={(e) =>
                handleBeneficiaryChange(index, "phoneNumber", e.target.value)
              }
              placeholder={`Enter Beneficiary ${index + 1}'s phone number`}
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
          <label
            htmlFor={`beneficiary-email-${index}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Beneficiary {index + 1}'s Email
            <Input
              id={`beneficiary-email-${index}`}
              type="email"
              value={beneficiary.email}
              onChange={(e) =>
                handleBeneficiaryChange(index, "email", e.target.value)
              }
              placeholder={`Enter Beneficiary ${index + 1}'s email`}
              className="p-[0.8rem] rounded-[1rem] font-[400] border"
            />
          </label>
        </div>
      )) || null
    );





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
