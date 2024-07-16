import PrimaryBtn from "@components/button/PrimaryBtn";
import { Button, Form, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";
import { BASE_URL } from "@api/index";
import { useMutation } from "@tanstack/react-query";
import { VerifyOTPFormData } from "../../types/OTPTypes";

const VerifyAccount = () => {
  const location = useLocation();
  const email = location.state?.email || "(your email address)";
  const [verified, setVerified] = useState(false);

  const ResendOTP = () => {
    alert("Resend OTP Verification");
  };

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (formData: VerifyOTPFormData) => {
      console.log("formData before sending:", formData);
      const response = await fetch(
        `${BASE_URL}/v1/auth/passenger/confirm-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to confirm email!");
      }

      return response.json();
    },
    onSuccess: () => {
      setVerified(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFinish = (values: { otp: string }) => {
    console.log("Form Data:", values);
    setErrorMessage(null);

    // Retrieve the emailConfirmationToken from local storage
    const emailConfirmationToken = localStorage.getItem(
      "emailConfirmationToken"
    );
    if (!emailConfirmationToken) {
      setErrorMessage("Email confirmation token is missing!");
      return;
    }

    const formData: VerifyOTPFormData = {
      emailConfirmationToken,
      otp: values.otp,
    };

    mutate(formData);
  };

  return (
    <div className="flex w-full h-screen justify-center">
      {!verified ? (
        <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className="flex flex-col gap-[16px]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Enter Verification Code
              </h2>
              <h4 className="text-[1.6rem] lg:w-[32rem] lg:mx-auto font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                We have just sent a 4-digit OTP code to your email address{" "}
                {email}
              </h4>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              className="w-full mt-[2rem]"
            >
              <div className="my-[1.6rem] w-full flex justify-center">
                <Form.Item
                  name="otp"
                  rules={[{ required: true, message: "Please input the OTP!" }]}
                >
                  <Input.OTP
                    length={4}
                    formatter={(str) => str.toUpperCase()}
                    {...sharedProps}
                  />
                </Form.Item>
              </div>
              {isError && errorMessage && (
                <p className="text-center text-brandErrorColor">
                  {errorMessage}
                </p>
              )}
              <div className="w-full flex flex-col justify-center">
                <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
                  Didn’t get OTP?
                  <span
                    onClick={ResendOTP}
                    className="font-[600] text-primaryColor cursor-pointer"
                  >
                    Resend
                  </span>
                </p>
                <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
                  OTP expires in
                  <span className="font-[600] text-primaryColor cursor-pointer">
                    04:59
                  </span>
                </p>
              </div>
              <Form.Item>
                <Button
                  loading={isPending}
                  type="primary"
                  htmlType="submit"
                  className="bg-primaryColor text-white w-full rounded-[1rem] duration-500 mt-[26px] lg:mt-[34px]"
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-[0.8rem] ">
              <Link
                to="/login"
                className="font-[600] text-primaryColor cursor-pointer"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <IoCheckmarkCircleOutline size={100} color="#0A8917" />
            <div className="flex flex-col gap-[16px]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Verification Successful
              </h2>
              <h4 className="text-[1.6rem] lg:w-[32rem] lg:mx-auto font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                Your details have been verified. Click on login to secure your
                account.
              </h4>
            </div>

            <Form.Item className="w-full">
              <PrimaryBtn
                to="/login"
                className="bg-primaryColor text-white duration-500 mt-[26px] lg:mt-[34px]"
              >
                Login
              </PrimaryBtn>
            </Form.Item>
          </div>
        </div>
      )}

      <div
        className="lg:w-[50%] hidden lg:flex bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('../../../public/svgs/signup_image.svg')",
        }}
      ></div>
    </div>
  );
};

export default VerifyAccount;
