import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import QuantityInput from "./QtyInput";
import SelectComponent from "@components/select";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { BASE_URL } from "@api/index";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";
import { use_round_trip } from "../../store/round_trip";
import { storeState } from "../../types/Trip";
import dayjs, { Dayjs } from "dayjs";

// import { round_trip_form_data } from "../../types/Trip";

const RoundTrip: React.FC = () => {
  
  // SETTING ROUNDTRIP FORM DATA TO STORE
  const set_trip_data = use_round_trip(
    (state: storeState) => state.set_trip_data
  );



  const set_trip_details = use_round_trip(
    (state: storeState) => state.set_round_trip_post_data
  );
  const trip_details = use_round_trip(
    (state: storeState) => state.round_trip_post_data
  );



  function disabledDate(current: Dayjs) {
    // Disable dates before today or after 1 month from today
    const today = dayjs();
    const oneMonthFromToday = today.add(27, "day").endOf("day");

    return (
      current && (current < today.startOf("day") || current > oneMonthFromToday)
    );
  }
  // NUMBER OF ADULTS
  const [number_of_adults, set_number_of_adults] = useState<number>(1);
  // NUMBER OF CHILDREN
  const [number_of_children, set_number_of_children] = useState<number>(0);

  const handleQuantityChange1 = (value: number | null) => {
    if (value !== null) {
      set_number_of_adults(value);
    }
  };

  const handleQuantityChange2 = (value: number | null) => {
    if (value !== null) {
      set_number_of_children(value);
    }
  };
  // TRAVELLING FROM
  const [departure_terminal, set_departure_terminal] = useState<string>("");
  // TRAVELING TO
  const [arrival_terminal, set_arrival_terminal] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_departure_terminal(event.target.value);
  };
  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set_arrival_terminal(event.target.value);
  };
  // DEPARTURE DATE
  const [departure_date, set_departure_date] = useState<string>("");

  const handleDateChange = (date: Moment) => {
    // set_departure_date(date);
    if (date) {
      // Format the date for logging - just for display, not to set state
      const formattedDate = date.format("YYYY-MM-DD");
      set_departure_date(formattedDate);
      // const formattedDateTime = date.format('YYYY-MM-DD HH:mm:ss');

      console.log(formattedDate); // Print the date in 'YYYY-MM-DD' format
    } else {
      set_departure_date("");
    }
  };
  // ARRIVAL DATE
  const [arrival_date, set_arrival_date] = useState<string>("");

  const handleDateChange2 = (date: Moment) => {
    if (date) {
      // Format the date for logging - just for display, not to set state
      const formattedDate = date.format("YYYY-MM-DD");
      set_arrival_date(formattedDate);
      console.log(formattedDate);
      // const formattedDateTime = date.format('YYYY-MM-DD HH:mm:ss');
    } else {
      set_arrival_date("");
    }
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // GET ALL TERMINALS FROM DATABASE
  interface Terminal {
    terminalName: string;
    _id: string;
    // other properties...
  }

  // const [userToken, setUserToken] = useState<string | null>(null);
  const [departure_terminal_options, set_departure_terminal_options] = useState<
    { value: string; label: string }[]
  >([]);
  const [arrival_terminal_options, set_arrival_terminal_options] = useState<
    { value: string; label: string }[]
  >([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchAllTerminals"],
    // queryKey: ["fetchAllTerminals", userToken],
    queryFn: () => fetchTerminals(),
    // enabled: !!userToken,
  });

  const isButtonDisabled = useMemo(() => {
    return !(
      departure_terminal &&
      arrival_terminal &&
      departure_date &&
      arrival_date
    );
  }, [departure_terminal, arrival_terminal, departure_date, arrival_date]);

  // useEffect(() => {
  //   const theUserToken = sessionStorage.getItem("authToken")
  //     ? sessionStorage.getItem("authToken")
  //     : localStorage.getItem("authToken");
  //   if (theUserToken) {
  //     console.log(theUserToken, "from uncle");
  //     setUserToken(theUserToken);
  //   } else {
  //     console.error("No auth token found in sessionStorage.");
  //   }
  // }, []);

  //############ FETCH TERMINALS START HERE

  useEffect(() => {
    if (data ) {
    
      const formatedTerminalList = data.terminals as Terminal[];

      // options for the departure dropdown
      const newOptions = formatedTerminalList.map((terminal) => ({
        value: terminal._id,
        label: terminal.terminalName,
      }));
      set_departure_terminal_options(newOptions);

      // Filter the arrival options based on the selected departure terminal
      const filteredOptions = formatedTerminalList
        .filter((terminal) => terminal._id !== departure_terminal) // Exclude the selected departure terminal
        .map((terminal) => ({
          value: terminal._id,
          label: terminal.terminalName,
        }));
      
      set_arrival_terminal_options(filteredOptions);
    }

  }, [data, departure_terminal]);


  //   if (data) {
  //     const formatedTerminalList = data.result as Terminal[];

  //     // options for the departure dropdown
  //     const newOptions = formatedTerminalList?.map((terminal) => ({
  //       value: terminal._id,
  //       label: terminal.terminalName,
  //     }));
  //     set_arrival_terminal_options(newOptions);

  //     // Filter the arrival options based on the selected departure terminal
  //     const filteredOptions = formatedTerminalList
  //       ?.filter((terminal) => terminal._id !== arrival_terminal)
  //       ?.map((terminal) => ({
  //         value: terminal._id,
  //         label: terminal.terminalName,
  //       }));
  //     set_departure_terminal_options(filteredOptions);
  //   }
  // }, [data, arrival_terminal]);

  // // FETCH TERMINALS ENDS HERE  ##################
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

  if (error) {
    console.error("Error fetching terminals:", error);
    return <div>There was an error: {(error as Error).message}</div>;
  }

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-8">
        <Spin />
      </div>
    );

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  // TRIP SEARCH FUNCTION STARTS HERE
  const HandleTripSearch = () => {
    const the_trip_data = {
      departure_terminal,
      arrival_terminal,
      departure_date,
      arrival_date,
      number_of_adults,
      number_of_children,
    };

    set_trip_data(the_trip_data);
    set_trip_details({
      ...trip_details,
      departureTerminal: departure_terminal,
      arrivalTerminal: departure_terminal,
    });
  };

  return (
    <div className="flex flex-col gap-[1.6rem] w-full">
      <label
        htmlFor="from"
        className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
      >
        Travelling From
        <SelectComponent
          options={departure_terminal_options}
          value={departure_terminal}
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
          options={arrival_terminal_options}
          value={arrival_terminal}
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
          value={departure_date ? moment(departure_date, "YYYY-MM-DD") : null}
          onChange={handleDateChange}
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
          value={arrival_date ? moment(arrival_date, "YYYY-MM-DD") : null}
          onChange={handleDateChange2}
          placeholder="Select a date"
          disabledDate={disabledDate}
        />
      </label>

      <div className="flex justify-between mt-[1.6rem]">
        <label className="text-[1.6rem] font-[500]">Number of Adults</label>
        <QuantityInput
          min={1}
          max={10}
          value={number_of_adults}
          onChange={handleQuantityChange1}
        />
      </div>
      <div className="flex justify-between mt-[1.2rem]">
        <label className="text-[1.6rem] font-[500]">Number of Children</label>
        <QuantityInput
          min={0}
          max={2}
          value={number_of_children}
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
          onClick={HandleTripSearch}
          type="primary"
          htmlType="submit"
          className="w-full h-[4.8rem] mt-[2.4rem] rounded-[1rem]"
          disabled={isButtonDisabled}
        >
          Search
        </Button>
      </Link>
    </div>
  );
};

export default RoundTrip;
