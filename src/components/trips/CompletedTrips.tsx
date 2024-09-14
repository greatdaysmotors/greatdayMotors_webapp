import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { formatDDate } from "@utils/formatDate";
import axios from "axios";
import directionicon from "../../../public/pngs/drn.svg";
import Trip from "./Trip";
import { Spin } from "antd";
import useStore from "../../store";
import { TripData } from "../../types/Trip";

interface TripsResponse {
  trips: TripData[];
}

const CompletedTrips = () => {
  const userToken = useAuthToken();

  const fetchCompletedTrips = async (): Promise<TripsResponse> => {
    try {
      const response = await axios.get<TripsResponse>(
        `${BASE_URL}/v1/passenger/trip-history/completed`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch completed trips");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching completed trips:", error);
      throw new Error("Error fetching completed trips");
    }
  };

  const {
    data,
    isPending,
    isError,
    error,
  }: UseQueryResult<TripsResponse, Error> = useQuery({
    queryKey: ["CompletedTrips"],
    queryFn: fetchCompletedTrips,
  });

  const trips = (data as TripsResponse)?.trips || [];
  const setSelectedTrip = useStore((state) => state.setSelectedTrip);

  const handleTripSelect = (trip: TripData) => {
    setSelectedTrip(trip);
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center w-full mt-4">
        <Spin />
      </div>
    );
  if (isError) return <p>Error fetching trips: {error?.message}</p>;

  return (
    <div className="md:mt-[1rem] lg:mt-[2rem] flex flex-col gap-[2.4rem]">
      {trips.length ? (
        trips.map((trip) => (
          <Trip
            key={trip._id}
            onClick={() => handleTripSelect(trip)}
            imageSrc={directionicon}
            altText={"direction icon"}
            route={`${trip.departureTerminal.terminalName} ==> ${trip.arrivalTerminal.terminalName}`}
            time={formatDDate(trip.availableTrip.departureDateTime)}
            price={`₦${trip.totalTripCost.toLocaleString()}`}
            tripStatus={trip.availableTrip.tripStatus ?? "Unknown"}
          />
        ))
      ) : (
        <p className="text-center lg:text-[1.6rem]">
          No completed trips available.
        </p>
      )}
    </div>
  );
};

export default CompletedTrips;
