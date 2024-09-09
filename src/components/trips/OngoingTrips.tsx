import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { formatDDate } from "@utils/formatDate";
import axios from "axios";
import directionicon from "../../../public/pngs/drn.svg";
import Trip from "./Trip";
import { Spin } from "antd";
interface DepartureTerminal {
  terminalName: string;
  terminalAddress: string;
  terminalLGA: string;
  terminalState: string;
}
interface AvailableTrip {
  departureDateTime: string;
  tripCost: number;
  tripStatus: string;
  seatsAvailable: number;
  driver: string;
  vehicle: string;
}
interface TripData {
  _id: string;
  fullName: string;
  departureTerminal: DepartureTerminal;
  arrivalTerminal: DepartureTerminal;
  availableTrip: AvailableTrip;
  returnTrip: AvailableTrip;
  departureSeatNumbers: number[];
  returnSeatNumbers: number[];
  totalTripCost: number;
}

interface TripsResponse {
  trips: TripData[];
}

const OngoingTrips = () => {
  const userToken = useAuthToken();

  const fetchOngoingTrips = async (): Promise<TripsResponse> => {
    try {
      const response = await axios.get<TripsResponse>(
        `${BASE_URL}/v1/passenger/trip-history/ongoing`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.error("trips data", response);

      if (response.status !== 200) {
        throw new Error("Failed to fetch upcoming trips");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
      throw new Error("Error fetching upcoming trips");
    }
  };

  const {
    data,
    isPending,
    isError,
    error,
  }: UseQueryResult<TripsResponse, Error> = useQuery({
    queryKey: ["OngoingTrips"],
    queryFn: fetchOngoingTrips,
  });

  const trips = (data as TripsResponse)?.trips || [];

  if (isPending) return <div className="flex justify-center items-center w-full mt-4"><Spin /></div>;
  if (isError) return <p>Error fetching trips: {error?.message}</p>;

  return (
    <div className="md:mt-[1rem] lg:mt-[2rem] flex flex-col gap-[2.4rem]">
      {trips.length ? (
        trips.map((trip) => (
          <Trip
            key={trip._id}
            imageSrc={directionicon}
            altText={"direction icon"}
            route={`${trip.departureTerminal.terminalName} ==> ${trip.arrivalTerminal.terminalName}`}
            time={formatDDate(trip.availableTrip.departureDateTime)}
            price={`₦${trip.totalTripCost.toLocaleString()}`}
          />
        ))
      ) : (
        <p className="text-center lg:text-[1.6rem]">
          No ongoing trips available.
        </p>
      )}
    </div>
  );
};

export default OngoingTrips;
