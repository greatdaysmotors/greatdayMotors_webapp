import PrimaryBtn from "@components/button/PrimaryBtn";
import { Form, Input } from "antd";
import { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [reset, setReset] = useState(false);
  const AccountResetPassword = () => {
    alert("You are resetting your password!");
    setReset(true);
  };
  return (
    <div className="flex w-full h-screen justify-center">
      {!reset ? (
        <div className="w-full lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <Link to="/">
              <img src="../../../public/svgs/gd_logo.svg" alt="logo" />
            </Link>
            <div className="w-[28rem]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Reset Password
              </h2>
            </div>
            <Form
              layout="vertical"
              onFinish={AccountResetPassword}
              className="w-full mt-[2rem]"
            >
              <Form.Item
                label={<span className="text-[1.6rem]">New Password</span>}
                name="newpassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password className="p-3 rounded-[1rem]" />
              </Form.Item>

              <Form.Item
                label={<span className="text-[1.6rem]">Confirm Password</span>}
                name="confirmnewpassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password className="p-3 rounded-[1rem]" />
              </Form.Item>

              <Form.Item>
                <PrimaryBtn className="bg-primaryColor text-white  duration-500 mt-[26px] lg:mt-[34px]">
                  Reset Password
                </PrimaryBtn>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <IoCheckmarkCircleOutline size={100} color="#0A8917" />
            <div className="lg:w-[28rem] flex flex-col gap-[16px]">
              <h2 className="text-[2rem] lg:leading-[4rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Password Reset Successful
              </h2>
              <h4 className="text-[1.6rem] lg:w-[32rem] lg:mx-auto font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                You have successfully reset your password. Click on login to
                login to your account.
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

export default ResetPassword;
