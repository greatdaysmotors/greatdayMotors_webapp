import Input from "@components/input";
import { Button, Radio, Tabs } from "antd";
import { Link } from "react-router-dom";
import OneWayTrip from "./OneWayTrip";
import RoundTrip from "./RoundTrip";
import { RadioChangeEvent } from "antd/lib/radio";
import { useState } from "react";
// import useStore from "../../store";

interface BookTripProps {
  className?: string;
}

const BookTrip: React.FC<BookTripProps> = ({ className }) => {
  const [selectedTab, setSelectedTab] = useState<string>("bookTrip");

  const handleTabChange = (e: RadioChangeEvent) => {
    setSelectedTab(e.target.value);
  };

  // const { selectedTripType, setSelectedTripType } = useStore((state) => ({
  //   selectedTripType: state.selectedTripType,
  //   setSelectedTripType: state.setSelectedTripType,
  // }));

  // const handleTripTabChange = (key: string) => {
  //   setSelectedTripType(key);
  // };

  return (
    <div
      className={`bg-[#fff] w-full rounded-t-[4rem] py-[2.5rem] px-[2.5rem] -mt-[4rem] md:w-[514px] md:mx-auto lg:mt-2 md:py-[4rem] ${className}`}
    >
      <Radio.Group
        onChange={handleTabChange}
        value={selectedTab}
        className="w-full flex"
      >
        <Radio.Button
          value="bookTrip"
          className={`w-[50%] text-[1.4rem] lg:text-[1.6rem]  text-center flex justify-center items-center rounded-l-[1rem] h-[4rem]`}
        >
          Book Trip
        </Radio.Button>
        <Radio.Button
          value="checkBookingStatus"
          className={`w-[60%] text-[1.4rem]  lg:text-[1.6rem]   text-center flex justify-center items-center rounded-r-[1rem] h-[4rem]`}
        >
          Check Booking Status
        </Radio.Button>
      </Radio.Group>
      <hr />
      <hr />
      {selectedTab === "bookTrip" ? (
        <Tabs
          // activeKey={selectedTripType}
          // onChange={handleTripTabChange}
          defaultActiveKey="1"
          tabPosition={"top"}
        >
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">One-Way Trip</span>}
            key="1"
          >
            <OneWayTrip />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">Round Trip</span>}
            key="2"
          >
            <RoundTrip />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Tabs defaultActiveKey="3" tabPosition={"top"}>
          <form className="w-full ">
            <label
              htmlFor="refID"
              className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]"
            >
              Reference ID
              <Input
                type="text"
                placeholder="Enter your reference ID"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </label>

            <Link to="/booking-status">
              <Button
                type="primary"
                htmlType="submit"
                className="p-[2rem] font-[400] mt-[2rem] md:mt-[32px] text-[1.6rem] rounded-[10px] w-full"
              >
                Search
              </Button>
            </Link>
          </form>
        </Tabs>
      )}
    </div>
  );
};

export default BookTrip;
