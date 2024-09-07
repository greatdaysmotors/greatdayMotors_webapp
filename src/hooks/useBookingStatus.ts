// import { BASE_URL } from "@api/index";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// // Modify the function to accept the token
// const fetchBookingStatus = async (referenceId: string, token: string) => {
//   if (!referenceId) {
//     throw new Error("Reference ID is required");
//   }
//   const { data } = await axios.get(
//     `${BASE_URL}/v1/passenger/booking-status/${referenceId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`, // Pass the token in the headers
//       },
//     }
//   );
//   return data;
// };

// // Modify the hook to accept the token
// export const useBookingStatus = (referenceId: string, userToken: string) => {
//   return useQuery(
//     ["bookingStatus", referenceId],
//     () => fetchBookingStatus(referenceId, userToken), // Pass the token here
//     {
//       enabled: !!referenceId && !!userToken, // Only fetch if both referenceId and token are available
//       staleTime: 60000,
//     }
//   );
// };
