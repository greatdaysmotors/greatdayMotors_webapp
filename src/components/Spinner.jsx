import React from "react";

const Spinner = ({ color }) => {
  return (
    <div
      style={{
        color: color,
      }}
      className="spinner spinner--steps icon-spinner"
      aria-hidden="true"
    ></div>
  );
};

export default Spinner;
