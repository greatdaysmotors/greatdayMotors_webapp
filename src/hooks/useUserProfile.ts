import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@api/index";

export const useUserProfile = (token: string | null) => {
  return useQuery({
    queryKey: ["userProfile", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token provided");
      }

      const response = await fetch(`${BASE_URL}/v1/passenger/passengers/profile`, {
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
    },
    enabled: !!token, // Only run the query if the token is available
  });
};
