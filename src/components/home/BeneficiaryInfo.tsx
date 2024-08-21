import SelectComponent from "@components/select";
import { Button, Input } from "antd";
import { useState } from "react";
import useStore from "../../store";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  showReviewModal: () => void;
}

export const BeneficiaryInfoStep: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  showReviewModal,
}) => {
  const tripDetails = useStore((state) => state.tripDetails);
  const numberOfChildren = Number(tripDetails.travellingWithAChild) || 0;

  const option = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [selectedOption2, setSelectedOption2] = useState<string | number>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption2(event.target.value);
  };

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
          <label
            htmlFor={`child-gender-${i}`}
            className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
          >
            Child {i + 1}'s Gender
            <SelectComponent
              options={option}
              value={selectedOption}
              onChange={handleSelectChange}
              placeholder="Gender"
            />
          </label>
        </div>
      );
    }

    return childrenFields;
  };

  return (
    <form>
      <h2 className="text-[1.4rem] md:text-[2.2rem] font-[700]">
        Beneficiary Information
      </h2>
      <div className="flex flex-col mt-3">
        <div className="md:flex md:gap-[2.4rem]">
          <div className="w-full flex flex-col gap-[1.6rem]">
            <label
              htmlFor="name"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Beneficiary's Name
              <Input
                type="text"
                placeholder="Enter your name"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>
            <label
              htmlFor="gender"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Beneficiary's Gender
              <SelectComponent
                options={option}
                value={selectedOption2}
                onChange={handleSelectChange2}
                placeholder="Gender"
              />
            </label>
            <label
              htmlFor="email"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Beneficiary's Email
              <Input
                type="text"
                placeholder="Enter your email"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>
            <label
              htmlFor="phone"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Beneficiary's Phone Number
              <Input
                type="text"
                placeholder="Enter your phone number"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>
          </div>

          {numberOfChildren > 0 && <hr className="my-8 md:hidden" />}

          {numberOfChildren > 0 && renderChildrenFields()}
        </div>

        <hr className="my-[1.6rem]" />

        <div className="mt-4 flex flex-col justify-end items-end">
          <div className="flex flex-col gap-1">
            <p className="text-[1.4rem] md:text-[1.8rem] font-[500]">
              Adult Fare: ₦18,200
            </p>
            <p className="text-[1.4rem] md:text-[1.8rem] font-[500]">
              Child Fare: ₦9,100
            </p>
            <p className="text-[1.4rem] md:text-[1.8rem] font-[500]">
              Total Fare: ₦27,300
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
        </div>
      </div>
    </form>
  );
};
