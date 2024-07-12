import PrimaryBtn from "@components/button/PrimaryBtn";
import { Form, GetProp, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { OTPProps } from "antd/es/input/OTP";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const nav = useNavigate();
  const [verify, setVerify] = useState(false);

  const ForgotPassword = () => {
    alert("Forgot Password???");
    setVerify(true);
  };
  const VerifyOTP = () => {
    alert("OTP Verification");
    nav("/reset-password");
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
              <img src="../../../public/svgs/gd_logo.svg" alt="logo" />
            </Link>
            <div className="w-[32rem] flex flex-col gap-[1.6rem]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Forgot Password?
              </h2>
              <h4 className="text-[1.6rem] font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                Enter your email address to reset password. A password reset
                email will be sent to you shortly.
              </h4>
            </div>
            <Form
              layout="vertical"
              onFinish={ForgotPassword}
              className="w-full mt-[2rem]"
            >
              <FormItem
                name="email"
                label={<span className="text-[1.6rem]">Email Address</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input className="p-3 rounded-[1rem]" />
              </FormItem>
              <Form.Item>
                <PrimaryBtn className="bg-primaryColor text-white  duration-500 mt-[26px] lg:mt-[34px]">
                  Send
                </PrimaryBtn>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <Link to="/">
              <img src="../../../public/svgs/gd_logo.svg" alt="logo" />
            </Link>
            <div className="flex flex-col gap-[16px]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Forgot Password?
              </h2>
              <h4 className="text-[1.6rem] lg:w-[32rem] lg:mx-auto font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                Enter the 4-digit number sent to your email address in the boxes
                below
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
                  Send
                </PrimaryBtn>
              </Form.Item>
            </Form>
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

export default ForgotPassword;
