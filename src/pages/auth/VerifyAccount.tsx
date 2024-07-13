import PrimaryBtn from "@components/button/PrimaryBtn";
import { Form, GetProp, Input, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { OTPProps } from "antd/es/input/OTP";
import { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";

const VerifyAccount = () => {
  const [verify, setVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const AccountVerifyAccount = () => {
    alert("Account Verification");
    setVerify(true);
  };
  const VerifyOTP = () => {
    alert("OTP Verification");
    setVerified(true);
  };
  const ResendOTP = () => {
    alert("Resend OTP Verification");
  };

  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div className="flex w-full h-screen justify-center">
      {!verify ? (
        <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className="w-[28rem] flex flex-col gap-[1.6rem]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Verify Account
              </h2>
              <h4 className="text-[1.6rem] font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                We have need to send you a code to authenticate your account
              </h4>
            </div>
            <Form
              layout="vertical"
              onFinish={AccountVerifyAccount}
              className="w-full mt-[2rem]"
            >
              <FormItem
                name="phoneNumber"
                label={<span className="text-[1.6rem]">Phone Number</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Space.Compact>
                  <Input
                    style={{ width: "15%" }}
                    className="p-3 rounded-[1rem]"
                    defaultValue="+234"
                    disabled
                  />
                  <Input
                    style={{ width: "85%" }}
                    className="p-3 rounded-[1rem]"
                    defaultValue="8126899573"
                  />
                </Space.Compact>
              </FormItem>
              <Form.Item>
                <PrimaryBtn className="bg-primaryColor text-white  duration-500 mt-[26px] lg:mt-[34px]">
                  Send OTP
                </PrimaryBtn>
              </Form.Item>
            </Form>

            <div className="mt-[0.8rem] ">
              <Link
                to="/login"
                className="font-[600] text-primaryColor cursor-pointer r"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      ) : !verified ? (
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
                We have just sent a 4-digit Otp code to your phone number
                +2349036600374
              </h4>
            </div>
            <div className="my-[1.6rem]">
              <Input.OTP
                length={4}
                formatter={(str) => str.toUpperCase()}
                {...sharedProps}
              />
            </div>
            <div className="w-[32.7rem]">
              <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
                Didn’t get Otp?
                <span
                  onClick={ResendOTP}
                  className="font-[600] text-primaryColor cursor-pointer r"
                >
                  Resend
                </span>
              </p>
              <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
                Otp expires in
                <span className="font-[600] text-primaryColor cursor-pointer r">
                  04:59
                </span>
              </p>
            </div>
            <Form
              layout="vertical"
              onFinish={VerifyOTP}
              className="w-full mt-[2rem]"
            >
              <Form.Item>
                <PrimaryBtn className="bg-primaryColor text-white  duration-500 mt-[26px] lg:mt-[34px]">
                  Verify OTP
                </PrimaryBtn>
              </Form.Item>
            </Form>

            <div className="mt-[0.8rem] ">
              <Link
                to="/login"
                className="font-[600] text-primaryColor cursor-pointer r"
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
                className="bg-primaryColor text-white  duration-500 mt-[26px] lg:mt-[34px]"
              >
                Login
              </PrimaryBtn>
            </Form.Item>
          </div>
        </div>
      )}

      <div
        className="lg:w-[50%] hidden lg:flex bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: "url('../../../public/svgs/signup_image.svg')",
        }}
      ></div>
    </div>
  );
};

export default VerifyAccount;
