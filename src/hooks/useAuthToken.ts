import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const theUserToken =
      sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
      // console.log("theUserToken", theUserToken);
      
    if (theUserToken) {
      // console.log(theUserToken, "from useAuthToken hook");
      setUserToken(theUserToken);
    } else {
      console.error("No auth token found in sessionStorage or localStorage.");
    }
  }, []);

  return userToken;
};

export default useAuthToken;
