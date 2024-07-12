import SelectComponent from "@components/select";
import { InfoStepProps } from "../../types/InfoTypes";
import { Button, Input } from "antd";
import { useState } from "react";

export const PersonalInfoStep: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
}) => {
  const option2 = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
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

  return (
    <form className="flex flex-col mt-3">
      <div className="md:flex md:gap-[2.4rem]">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
            Personal Information
          </h2>
          <div className="w-full flex flex-col gap-[1.6rem]">
            <label
              htmlFor="name"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Passenger’s Name
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
              Passenger’s Gender
              <SelectComponent
                options={option2}
                value={selectedOption2}
                onChange={handleSelectChange2}
                placeholder="Gender"
              />
            </label>
            <label
              htmlFor="email"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Passenger’s Email
              <Input
                type="text"
                placeholder="Enter your email"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>

            <label
              htmlFor="email"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Passenger’s Phone Number
              <Input
                type="text"
                placeholder="Enter your phone number"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
            Next-of-Kin Information
          </h2>
          <div className="w-full flex flex-col gap-[1.6rem]">
            <label
              htmlFor="name"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Next-of-Kin's Name
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
              Next-of-Kin's Gender
              <SelectComponent
                options={option}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Gender"
              />
            </label>
            <label
              htmlFor="email"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Next-of-Kin's Email
              <Input
                type="text"
                placeholder="Enter your email"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>

            <label
              htmlFor="email"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Next-of-Kin's Phone Number
              <Input
                type="text"
                placeholder="Enter your phone number"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>
          </div>
        </div>
      </div>

      <p className="text-[1.4rem] md:text-[1.8rem] md:mt-4  text-[#999999]">
        N/B: Please tick the box if you want your next-of-kin to get
        notification about the trip
      </p>

      <div className="flex  mt-3 gap-2 ">
        <Input type="checkbox" className="rounded-[1rem] border w-[2rem]" />
        <span className="text-[1.6rem] md:text-[1.8rem]  leading-[1.5rem] w-full">
          I want my next-of-kin to recieve an email about the trip.
        </span>
      </div>

      <hr className="my-[1.6rem]" />
      <div className="mt-4 flex flex-col justify-end items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
            Adult Fare: ₦18,200
          </p>
          <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
            Child Fare: ₦9,100
          </p>
          <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
            Total Fare: ₦27,300
          </p>
          {currentStep <= 4 && (
            <Button
              key="submit"
              type="primary"
              onClick={handleStepCompletion}
              className={`px-10 py-4 md:py-8 bg-primaryColor text-white rounded-[1rem] `}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
