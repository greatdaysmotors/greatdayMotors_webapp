/* eslint-disable react/prop-types */
import React from "react";

function Modal({ children }) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000088] z-[999999999] flex justify-center items-center">
      {children}
    </div>
  );
}
export default Modal;
