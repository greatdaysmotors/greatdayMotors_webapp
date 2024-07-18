import { Button } from "antd";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import QuantityInput from "./QtyInput";
import SelectComponent from "@components/select";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { BASE_URL } from "@api/index";
// import moment from 'moment';
import { DatePicker } from "antd";
import dayjs from "dayjs";


const RoundTrip: React.FC  = () => {

  function disabledDate(current: any) {
    // Disable dates before today or after 1 month from today
    const today = dayjs();
    const oneMonthFromToday = today.add(27, "day").endOf("day");

    return (
      current && (current < today.startOf("day") || current > oneMonthFromToday)
    );
  }



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







  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // GET ALL TERMINALS FROM DATABASE
  interface Terminal {
    terminalName: string;
    _id: string; 
    // other properties...
  }

  const [userToken, setUserToken] = useState<string | null>(null);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [options2, setOptions2] = useState<{ value: string; label: string }[]>(
    []
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchAllTerminals", userToken],
    queryFn: () => fetchTerminals(userToken),
    enabled: !!userToken,
  });

  useEffect(() => {
    const theUserToken = sessionStorage.getItem("authToken")?sessionStorage.getItem("authToken"):localStorage.getItem("authToken")
    if (theUserToken) {
      console.log(theUserToken, "from uncle");
      setUserToken(theUserToken);
    } else {
      console.error("No auth token found in sessionStorage.");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const formatedTerminalList = data.result as Terminal[];
      const newOptions = formatedTerminalList.map((terminal) => {
        console.log(terminal.terminalName);
        return { value: terminal._id, label: terminal.terminalName };
      });
      setOptions(newOptions);
    }
    if (data) {
      const formatedTerminalList = data.result as Terminal[];
      const newOptions2 = formatedTerminalList.map((terminal) => {
        console.log(terminal.terminalName);
        return { value: terminal._id, label: terminal.terminalName };
      });
      setOptions2(newOptions2);
    }
  }, [data]);

  const fetchTerminals = async (token: string | null) => {
    const response = await fetch(`${BASE_URL}/v1/staff/list/terminal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    return response.json();
  };

  if (error) {
    console.error("Error fetching terminals:", error);
    return <div>There was an error: {(error as Error).message}</div>;
  }

  if (isLoading) return <Spin />



 
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 









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
          value={selectedDate2}
          onChange={handleDateChange2}
          placeholder="Select a date"
          disabledDate={disabledDate}
        />
      </label>

      <label
        htmlFor="to"
        className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
      >
        Arrival Date
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          placeholder="Select a date"
          disabledDate={disabledDate}
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
