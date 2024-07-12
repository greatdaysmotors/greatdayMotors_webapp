import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import QuantityInput from "./QtyInput";
import SelectComponent from "@components/select";
import DatePicker from "@components/datepicker";

const RoundTrip = () => {
  const [quantity1, setQuantity1] = useState<number>(1);
  const [quantity2, setQuantity2] = useState<number>(1);

  const handleQuantityChange1 = (value: number | null) => {
    if (value !== null) {
      setQuantity1(value);
    }
  };

  const handleQuantityChange2 = (value: number | null) => {
    if (value !== null) {
      setQuantity2(value);
    }
  };

  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [selectedOption2, setSelectedOption2] = useState<string | number>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption2(event.target.value);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(null);

  const handleDateChange2 = (date: Date | null) => {
    setSelectedDate2(date);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const options2 = [
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
    { value: "option6", label: "Option 6" },
  ];

  return (
    <div className="flex flex-col gap-[1.6rem] w-full">
      <label
        htmlFor="from"
        className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
      >
        Travelling From
        <SelectComponent
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="Departure Terminal"
        />
      </label>
      <label
        htmlFor="to"
        className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
      >
        Travelling To
        <SelectComponent
          options={options2}
          value={selectedOption2}
          onChange={handleSelectChange2}
          placeholder="Departure Terminal"
        />
      </label>

      <label
        htmlFor="to"
        className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
      >
        Departure Date
        <DatePicker
          selected={selectedDate2}
          onChange={handleDateChange2}
          placeholderText="Select a date"
        />
      </label>

      <label
        htmlFor="to"
        className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
      >
        Arrival Date
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select a date"
        />
      </label>

      <div className="flex justify-between mt-[1.6rem]">
        <label className="text-[1.6rem] font-[500]">Number of Adults</label>
        <QuantityInput
          min={1}
          max={10}
          value={quantity1}
          onChange={handleQuantityChange1}
        />
      </div>
      <div className="flex justify-between mt-[1.2rem]">
        <label className="text-[1.6rem] font-[500]">Number of Children</label>
        <QuantityInput
          min={0}
          max={10}
          value={quantity2}
          onChange={handleQuantityChange2}
        />
      </div>
      <p className="text-[1.2rem] mt-[1.2rem]">
        <span className="text-primaryColor text-[1.2rem]">
          Additional fare charges
        </span>{" "}
        for an extra seat will be included if your child is{" "}
        <span className="text-primaryColor text-[1.2rem]">
          above 0-7 years.
        </span>{" "}
        Also note the Child’s information will be collected.
      </p>

      <Link to="/round-trip">
        <Button
          // onClick={HandleTripSearch}
          type="primary"
          htmlType="submit"
          className="w-full h-[4.8rem] mt-[2.4rem] rounded-[1rem]"
        >
          Search
        </Button>
      </Link>
    </div>
  );
};

export default RoundTrip;
