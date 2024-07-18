import PrimaryBtn from "@components/button/PrimaryBtn";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@api/index";

const ResetPassword = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [reset, setReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form] = Form.useForm();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: { resetToken: string; newPassword: string }) => {
      const response = await fetch(`${BASE_URL}/v1/auth/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password!");
      }

      return response.json();
    },
    onSuccess: () => {
      setReset(true);
    },
    onError: (error) => {
      setErrorMessage(error.message as string);
    },
  });

  const onFinish = async (values: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    if (values.newPassword !== values.confirmNewPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      await mutate({ resetToken: uuid!, newPassword: values.newPassword });
    } catch (error) {
      // onError will handle displaying the error message
    }
  };

  return (
    <div className="flex w-full h-screen justify-center">
      {!reset ? (
        <div className="w-full lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className="flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className="w-[28rem]">
              <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Reset Password
              </h2>
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="w-full mt-[2rem]"
            >
              <Form.Item
                label={<span className="text-[1.6rem]">New Password</span>}
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password className="p-3 rounded-[1rem]" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-[1.6rem]">Confirm New Password</span>
                }
                name="confirmNewPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="p-3 rounded-[1rem]" />
              </Form.Item>

              {isError && errorMessage && (
                <p className="text-center text-brandErrorColor">
                  {errorMessage}
                </p>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primaryColor py-[2rem] text-white w-full rounded-[1rem] duration-500 mt-[2rem]"
                  loading={isPending}
                  disabled={isPending}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
          <div className="flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
            <IoCheckmarkCircleOutline size={100} color="#0A8917" />
            <div className="lg:w-[28rem] flex flex-col gap-[16px]">
              <h2 className="text-[2rem] lg:leading-[4rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
                Password Reset Successful
              </h2>
              <h4 className="text-[1.6rem] lg:w-[32rem] lg:mx-auto font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
                You have successfully reset your password. Click on login to
                your account.
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
