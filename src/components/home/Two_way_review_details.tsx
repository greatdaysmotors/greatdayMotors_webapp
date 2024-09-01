import { Button, Modal } from "antd";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
// import { InfoStepProps } from "../../types/InfoTypes";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentModal: () => void;
}

export const Two_way_review_details: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  openReview,
  setOpenReview,
  showPaymentModal,
}) => {
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenReview(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpenReview(false);
  };

  const HandlePayStack = () => {
    handleStepCompletion();
    showPaymentModal();
  };

  return (
    <div>
      <Modal
        className="custom-modal"
        loading={loading}
        open={openReview}
        closable={false}
        title={null}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="mt-4 flex flex-col ">
            {currentStep <= 4 && (
              <Button
                key="submit"
                type="primary"
                onClick={HandlePayStack}
                className={`px-10 py-8 text-[1.6rem] bg-primaryColor text-white rounded-[1rem] `}
              >
                Pay with Paystack
              </Button>
            )}
          </div>,
        ]}
      >
        <MdClose
          className="absolute top-4 right-1 cursor-pointer"
          size={30}
          onClick={handleCancel}
        />
        <div className="mt-[1rem] flex justify-between gap-[0.8rem] bg-[#fff] lg:mt-[4rem]">
          <div className="flex flex-col gap-[0.8rem]">
            <div className="flex gap-[0.8rem] items-center lg:mt-[rem]">
              <CiLocationOn size={28} color="#2F2FC8" />
              <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                Akwa Ibom, Uyo Terminal
              </p>
            </div>
            <div className="flex-col">
              <TbDotsVertical color="#CCCCCC" size={20} />
            </div>
            <div className="flex gap-[0.8rem] items-center">
              <IoShieldCheckmarkOutline color="#0A8917" size={24} />
              <p className="text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-[700] text-[#000]">
                Oshodi, Lagos Terminal
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              One-way Trip
            </p>
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              1 Adult
            </p>
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              1 Child
            </p>
            <p className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] font-[500] text-right">
              30/04/24
            </p>
          </div>
        </div>

        <h2 className="text-[1.6rem] md:text-[2rem] lg:text-[2.2rem] font-[700] mt-[2rem]">
          Information Summary
        </h2>

        <div>
          <h2 className="text-[1.4rem] md:text-[1.8rem]  font-[700] mt-[2rem]">
            Passenger Information
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem]  ">Passenger’s Name</p>
            <p className="text-[1.4rem] font-[600]">Angela Queen</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Phone Number</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              09035500375
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Email</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              queenangela@gmail.com
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Gender</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">Female</p>
          </div>
        </div>
        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Trip Information
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Price</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">₦18,600</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Seat</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">Seat 2</p>
          </div>
        </div>
        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Next-of-Kin Information
          </h2>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Next-of-Kin Name</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              Angela Queen
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Phone Number</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              09035500375
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Email</p>
            <p className="text-[1.4rem font-[600]">queenangela@gmail.com</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] ">Gender</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">Female</p>
          </div>
        </div>
        <div>
          <h2 className="text-[1.4rem] md:text-[1.6rem] font-[700] mt-[2rem]">
            Beneficiary Information
          </h2>
          <div className="flex flex-col justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600] ">
              Akin Queen
            </p>
            <p className="text-[1.4rem] md:text-[1.6rem] ">Female | 11</p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-[1.4rem] md:text-[1.6rem] font-[600]">
              Akin Queen
            </p>
            <p className="text-[1.4rem] md:text-[1.6rem] ">
              akinqueen@gmail.com | 09036600374
            </p>
          </div>
        </div>
        <hr className="my-[1.6rem]" />
        <div className="mt-4 flex flex-col justify-start items-start">
          <div className="flex flex-col gap-1">
            <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">Adult Fare: ₦18,200</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">Child Fare: ₦9,100</p>
            <p className="text-[1.4rem] md:text-[1.6rem] font-[500]">Total Fare: ₦27,300</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
