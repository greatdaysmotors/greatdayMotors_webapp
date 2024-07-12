import CompletedTrips from "@components/trips/CompletedTrips";
import OngoingTrips from "@components/trips/OngoingTrips";
import UpcomingTrips from "@components/trips/UpcomingTrips";
import { Tabs } from "antd";

const BookingHistory = () => {
  return (
    <div className="">
      {" "}
      <h4 className="text-[1.8rem] md:text-[2.2rem] text-center font-[700] md:mt-[1rem]">
        Booking History
      </h4>
      <div className="flex flex-col">
        <Tabs defaultActiveKey="1" tabPosition={"top"}>
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">Upcoming Trips</span>}
            key="1"
          >
            <UpcomingTrips />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">Ongoing Trips</span>}
            key="2"
          >
            <OngoingTrips />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="lg:text-[1.8rem]">Completed Trips</span>}
            key="3"
          >
            <CompletedTrips />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingHistory;
