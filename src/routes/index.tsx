import CreateAccount from "@pages/auth/CreateAccount";
import ForgotPassword from "@pages/auth/ForgotPassword";
import Login from "@pages/auth/Login";
import ResetPassword from "@pages/auth/ResetPassword";
import SignUp from "@pages/auth/Signup";
import VerifyAccount from "@pages/auth/VerifyAccount";
import NotFound from "@pages/notfound/NotFound";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@pages/home"));
const TripSearch = lazy(() => import("@pages/tripSearch"));
const RoundTripSearch = lazy(() => import("@pages/roundTripSearch"));
const BookingStatus = lazy(() => import("@pages/bookingStatus"));
const AboutUs = lazy(() => import("@pages/about"));
const ContactUs = lazy(() => import("@pages/contact"));
const Logistics = lazy(() => import("@pages/logistics"));
const Bookings = lazy(() => import("@pages/bookings"));
const BookTicket = lazy(() => import("@pages/bookTicket"));
const HireService = lazy(() => import("@pages/hireService"));
const ResheduleTicket = lazy(() => import("@pages/resheduleTicket"));
const Profile = lazy(() => import("@pages/profile"));
const ChangePassword = lazy(() => import("@pages/changePassword"));
const DeleteAccount = lazy(() => import("@pages/deleteAccount"));
const TermsAndConditions = lazy(() => import("@pages/terms"));
const PrivacyPolicy = lazy(() => import("@pages/privacy"));
const LogOut = lazy(() => import("@pages/logout"));

const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />

        {/* auth screens */}
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/:uuid" element={<ResetPassword />} />
        {/* auth screens */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/oneway-trip" element={<TripSearch />} />
        <Route path="/round-trip" element={<RoundTripSearch />} />
        <Route path="/booking-status" element={<BookingStatus />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/book-ticket" element={<BookTicket />} />
        <Route path="/hire-service" element={<HireService />} />
        <Route path="/reshedule-ticket" element={<ResheduleTicket />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/log-out" element={<LogOut />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
