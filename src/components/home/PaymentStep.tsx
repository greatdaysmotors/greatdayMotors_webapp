import { Button, Modal } from "antd";
import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
// import { InfoStepProps } from "../../types/InfoTypes";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  openPayment: boolean;
  setOpenPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentStep: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  // currentStep,
  openPayment,
  setOpenPayment,
}) => {
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenPayment(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpenPayment(false);
  };

  const HandlePayment = () => {
    handleStepCompletion();
  };

  return (
    <div>
      <Modal
        className="h-[100rem]"
        loading={loading}
        open={openPayment}
        closable={false}
        title={null}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="mt-4 flex flex-col gap-[1rem]  justify-center w-[80%] mx-auto items-center py-36">
            <IoIosCheckmarkCircleOutline
              size={80}
              color="#0A8917"
              className="flex lg:hidden"
            />
            <IoIosCheckmarkCircleOutline
              size={120}
              color="#0A8917"
              className="hidden lg:flex"
            />
            <h4 className="text-[1.8rem] md:text-[2rem] font-[700] text-center lg:w-[30rem]">
              Your booking reservation is Successful
            </h4>
            <p className="text-[1.6rem] md:text-[1.8rem] font-[500] text-center">
              Thank you for choosing Greatday Motors. Kindly be at the terminal
              3o minutes before vehicle take off time.
            </p>

            <h4 className="text-[1.6rem] md:text-[1.8rem] font-[700] text-center">
              Ref ID:qw1236-12
            </h4>
            <Button
              key="submit"
              type="primary"
              onClick={HandlePayment}
              className={`px-10 mt-4 py-8 bg-primaryColor text-white rounded-[1rem] w-full`}
            >
              View Trip Details
            </Button>
          </div>,
        ]}
      >
        <MdClose
          className="absolute top-4 right-1 md:right-10 md:top-8 cursor-pointer"
          size={30}
          onClick={handleCancel}
        />
      </Modal>
    </div>
  );
};
