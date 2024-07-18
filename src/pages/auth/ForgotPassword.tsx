import { BASE_URL } from "@api/index";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
// import { OTPProps } from "antd/es/input/OTP";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";
import { ForgotPasswordFormData } from "../../types/EmailTypes";

const ForgotPassword = () => {
  // const nav = useNavigate();
  // const [verify, setVerify] = useState(false);

  // const VerifyOTP = () => {
  //   alert("OTP Verification");
  //   nav("/reset-password");
  // };

  // const ResendOTP = () => {
  //   alert("Resend OTP Verification");
  // };

  // const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
  //   console.log("onChange:", text);
  // };

  // const sharedProps: OTPProps = {
  //   onChange,
  // };

  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: ForgotPasswordFormData) => {
      console.log("formData before sending:", formData);
      const response = await fetch(
        `${BASE_URL}/v1/auth/forgot-password/passenger`,
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
        throw new Error(errorData.message || "Failed to send email!");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { message } = data;
      // setVerify(true);
      setSuccessMessage(message);
      form.resetFields();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFinish = async (values: ForgotPasswordFormData) => {
    mutate(values);
  };

  // Verify OTP

  // const [form] = Form.useForm();
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const { mutate, isError, isPending } = useMutation({
  //   mutationFn: async (formData: VerifyOTPFormData) => {
  //     console.log("formData before sending:", formData);
  //     const response = await fetch(
  //       `${BASE_URL}/v1/auth/passenger/confirm-email`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to confirm email!");
  //     }

  //     return response.json();
  //   },
  //   onSuccess: () => {
  //     setVerified(true);
  //   },
  //   onError: (error) => {
  //     setErrorMessage(error.message);
  //   },
  // });

  // const handleFinish = (values: { otp: string }) => {
  //   console.log("Form Data:", values);
  //   setErrorMessage(null);

  //   // Retrieve the emailConfirmationToken from local storage
  //   const emailConfirmationToken = localStorage.getItem(
  //     "emailConfirmationToken"
  //   );
  //   if (!emailConfirmationToken) {
  //     setErrorMessage("Email confirmation token is missing!");
  //     return;
  //   }

  //   const formData: VerifyOTPFormData = {
  //     emailConfirmationToken,
  //     otp: values.otp,
  //   };

  //   mutate(formData);
  // };

  return (
    <div className="flex w-full h-screen justify-center">
      {/* {!verify ? (
        ""
      ) : (
        <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <Link to="/">
              <img src={logo} alt="logo" />
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primaryColor text-white w-full rounded-[1rem] duration-500 mt-[26px] lg:mt-[34px]"
                  loading={isPending}
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )} */}

      <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
        <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="w-[32rem] flex flex-col gap-[1.6rem]">
            <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
              Forgot Password?
            </h2>
            <h4 className="text-[1.6rem] font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
              Enter your email address to reset password. A password reset email
              will be sent to you shortly.
            </h4>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
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
            {isError && errorMessage && (
              <p className="text-center text-brandErrorColor">{errorMessage}</p>
            )}
            {isSuccess && successMessage && (
              <p className="text-center text-brandSuccessColor">
                {successMessage}
              </p>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
               className="bg-primaryColor py-[2rem] text-white w-full rounded-[1rem] duration-500 mt-[2rem]"
                loading={isPending}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

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
