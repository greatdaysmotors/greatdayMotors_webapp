// import { useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const useAxiosInterceptor = () => {
//   const navigate = useNavigate();

//   const handleLogout = useCallback(() => {
//     alert("Your session has expired. You have been logged out.");
//     localStorage.removeItem("authToken");
//     sessionStorage.removeItem("authToken");
//     localStorage.removeItem("userDetails");
//     sessionStorage.removeItem("userDetails");
//     navigate("/login"); // Redirect to login page
//   }, [navigate]); // Memoize `handleLogout` so it doesn't change between renders

//   useEffect(() => {
//     const interceptor = axios.interceptors.response.use(
//       (response) => {
//         console.log("Request successful:", response); // Log successful responses
//         return response;
//       },
//       (error) => {
//         console.log("useAxiosInterceptor error:", error); // Log all errors
//         if (error.response?.data?.errorMessage === "jwt expired") {
//           handleLogout(); // Trigger logout on JWT expiration
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Eject the interceptor on component unmount to prevent memory leaks
//     return () => {
//       axios.interceptors.response.eject(interceptor);
//     };
//   }, [handleLogout]);
//   // Now, `handleLogout` is stable and doesn't change
// };

// export default useAxiosInterceptor;
