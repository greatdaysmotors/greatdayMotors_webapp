import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuantityInput from "./QtyInput";
import SelectComponent from "@components/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { BASE_URL } from "@api/index";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { formatDate } from "@utils/formatDate";
import useStore from "../../store";
import { storeState, TripData } from "../../types/Trip";
import toast from "react-hot-toast";
import { use_round_trip } from "../../store/round_trip";

interface Terminal {
  terminalName: string;
  _id: string;
}

const OneWayTrip: React.FC = () => {
  // SETTING IS ROUN TRIP TAB ACTIVE
  const set_is_round_trip_tab_active = use_round_trip(
    (state: storeState) => state.set_round_trip_active
  );

  const nav = useNavigate();

  const addTrip = useStore((state) => state.addTrip);
  const resetTrips = useStore((state) => state.resetTrips);
  const setOneWayTripPayload = useStore((state) => state.setOneWayTripPayload);
  const setTripDetails = useStore((state) => state.setTripDetails);

  function disabledDate(current: Dayjs) {
    // Disable dates before today or after 1 month from today
    const today = dayjs();
    const oneMonthFromToday = today.add(27, "day").endOf("day");

    return (
      current && (current < today.startOf("day") || current > oneMonthFromToday)
    );
  }

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFromTerminal, setSelectedFromTerminal] = useState<
    string | number
  >("");

  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [selectedToTerminalName, setSelectedToTerminalName] =
    useState<string>("");

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [quantity1, setQuantity1] = useState<number>(1);
  const [quantity2, setQuantity2] = useState<number>(1);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedElement = event.target.options[selectedIndex];

    const terminalName = (selectedElement as HTMLOptionElement).text;
    setSelectedOption(event.target.value);
    setSelectedFromTerminal(terminalName);
  };
  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedElement = event.target.options[selectedIndex];

    const terminalName = (selectedElement as HTMLOptionElement).text;
    setSelectedOption2(event.target.value);
    setSelectedToTerminalName(terminalName);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

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

  // GET ALL TERMINALS FROM DATABASE
  const [userToken, setUserToken] = useState<string | null>(null);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [options2, setOptions2] = useState<{ value: string; label: string }[]>(
    []
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchAllTerminals", userToken],
    queryFn: () => fetchTerminals(),
    // enabled: !!userToken,
  });

  useEffect(() => {
    const theUserToken = sessionStorage.getItem("authToken")
      ? sessionStorage.getItem("authToken")
      : localStorage.getItem("authToken");
    if (theUserToken) {
      setUserToken(theUserToken);
    } else {
      console.error("No auth token found in sessionStorage.");
    }
  }, []);

  useEffect(() => {
    console.log("data", data);
    if (data) {
      const formatedTerminalList = data.terminals as Terminal[];

      // options for the departure dropdown
      const newOptions = formatedTerminalList?.map((terminal) => ({
        value: terminal._id,
        label: terminal.terminalName,
      }));
      setOptions(newOptions);

      // Filter the arrival options based on the selected departure terminal
      const filteredOptions = formatedTerminalList
        ?.filter((terminal) => terminal._id !== selectedOption)
        ?.map((terminal) => ({
          value: terminal._id,
          label: terminal.terminalName,
        }));
      setOptions2(filteredOptions);
      set_is_round_trip_tab_active(true);
    }
  }, [data, selectedOption, set_is_round_trip_tab_active]);

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

  const {
    mutate,
    // isError,
    isPending,
    // isSuccess,
    // data,
  } = useMutation({
    mutationFn: async () => {
      if (!selectedOption || !selectedOption2 || !selectedDate) {
        toast("Please select all fields.");
        return;
      }

      const formattedDate = selectedDate ? formatDate(selectedDate) : null;

      const url = `${BASE_URL}/v1/passenger/one-way-trip/${selectedOption}/${selectedOption2}/${formattedDate}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch trip details.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      data.trips.forEach((trip: TripData) => addTrip(trip));
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const HandleTripSearch = () => {
    // Reset trips before starting a new search
    resetTrips();

    // Perform the search mutation
    mutate();

    const tripPayload = {
      tripType: "One-way Trip",
      from: selectedFromTerminal as string,
      to: selectedToTerminalName,
      date: selectedDate ? formatDate(selectedDate) : null,
      adult: quantity1,
      child: quantity2,
    };

    setTripDetails({
      fullName: "",
      email: "",
      phoneNumber: "",
      departureTerminal: selectedOption,
      arrivalTerminal: selectedOption2,
      travellingWithAChild: quantity2 > 0,
      returnTrip: null,
      returnSeatNumbers: null,
      departureSeatNumbers: [],
      nextOfKinName: "",
      nextOfKinPhoneNumber: "",
      nextOfKinEmail: "",
      sendEmailToNextOfKin: false,
      totalTripCost: 0,
    });

    // Save the payload to the store
    setOneWayTripPayload(tripPayload);

    if (!isPending) {
      nav("/oneway-trip");
    }
  };

  // Compute if the button should be disabled
  const isButtonDisabled = useMemo(() => {
    return !(selectedOption && selectedOption2 && selectedDate);
  }, [selectedOption, selectedOption2, selectedDate]);

  if (error) {
    console.error("Error fetching terminals:", error);
    return (
      <div className="text-red-600">
        {(error as Error).message}: Check your internet connection
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-8">
        <Spin />
      </div>
    );

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
          value={selectedDate}
          onChange={handleDateChange}
          placeholder="Select a date"
          disabledDate={disabledDate}
          format="MM DD, YYYY"
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
          max={2}
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

      <Button
        onClick={HandleTripSearch}
        loading={isPending}
        disabled={isButtonDisabled}
        type="primary"
        htmlType="submit"
        className="w-full h-[4.8rem] mt-[2.4rem] rounded-[1rem]"
      >
        Search
      </Button>
    </div>
  );
};

export default OneWayTrip;
