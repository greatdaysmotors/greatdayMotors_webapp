import type { RadioChangeEvent } from "antd";
import { Button, Radio, Tabs } from "antd";
import { useState } from "react";
import bgImage from "../../../public/svgs/gd_hero.png";
import OneWayTrip from "./OneWayTrip";
import RoundTrip from "./RoundTrip";
import { Link } from "react-router-dom";
import Input from "@components/input";

const HeroSection = () => {
  const [selectedTab, setSelectedTab] = useState<string>("bookTrip");

  const handleTabChange = (e: RadioChangeEvent) => {
    setSelectedTab(e.target.value);
  };

  return (
    <div
      className="bg-cover bg-center md:h-[90rem] lg:h-[75rem] bg-no-repeat flex flex-col items-center  lg:px-[4.4rem] "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col lg:flex-row  gap-[8rem] items-center  md:h-[75rem] max-w-[1440px]">
        <div className="flex flex-col gap-[1.5rem] w-[80%] md:w-[55%] mx-auto mt-14 ">
          <h2 className="text-[2rem] font-[700] text-[#fff] text-center lg:text-[4rem] lg:text-left">
            Book Your Journey and Delight in Unforgettable Experiences
          </h2>
          <h4 className="text-[1.6rem] text-[#fff] text-center lg:text-[2.4rem] lg:text-left font-[400]">
            Book Your Seat Today and Set Off on Your Affordable Inter-City
            Adventure Today and Discover a World of Unparalleled Experiences
            Awaiting Your Exploration
          </h4>
        </div>
        <div className="bg-[#fff] w-full rounded-t-[4rem] py-[2.5rem] px-[2.5rem] -mt-[4rem] md:w-[514px] md:mx-auto lg:mt-2 md:py-[4rem]">
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
            <Tabs defaultActiveKey="1" tabPosition={"top"}>
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
                    className="p-[2rem] font-[400] mt-[2rem] md:mt-[32px] text-[1.6rempx] rounded-[10px] w-full"
                  >
                    Search
                  </Button>
                </Link>
              </form>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
