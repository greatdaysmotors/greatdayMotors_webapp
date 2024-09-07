import React, { useState, useEffect } from "react";
import "../components/success_component/Success.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessMessage,
  setUpdateSuccessMessage,
} from "../logics/vehicle/addVehicle/loadingSlice";

const SuccessModal = ({ title, message, setIsSuccess }) => {
  const dispatch = useDispatch();
  const tripmessage = useSelector(
    (state) => state.loadingTripSlice.successMessage
  );

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(setSuccessMessage(null));
      dispatch(setUpdateSuccessMessage(null));
      setIsSuccess(false);
    }, 3000);

    return () => {
      clearTimeout(time);
      
    };
  }, [dispatch, setIsSuccess]);

  // Determine if the message indicates a failure
  const isError = tripmessage === "Failed To Create Trip.";

  return (
    <div className={`successSubContainer ${isError ? "error" : "success"}`}>
      <div className={`side ${isError ? "error-side" : "success-side"}`}></div>
      <div className="success-text-container">
        <div className={`head`}>{title}</div>
        <div className="body">{message}</div>
      </div>
    </div>
  );
};

export default SuccessModal;
