import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../api";
import { FormData } from "../../types/RegisterTypes";
import { useState } from "react";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("formData before sending:", formData);
      const response = await fetch(`${BASE_URL}/v1/auth/passenger/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register!");
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      const { emailConfirmationToken, message } = data;

      localStorage.setItem("emailConfirmationToken", emailConfirmationToken);

      setSuccessMessage(message);

      form.resetFields();
      setTimeout(() => {
        navigate("/verification", { state: { email: variables.email } });
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleFinish = (values: FormData) => {
    console.log("Form Data:", values);
    setErrorMessage(null);
    setSuccessMessage(null);
    mutate(values);
  };

  return (
    <div className="flex w-full h-screen justify-center">
      <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
        <div className="flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="w-[28rem]">
            <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
              Create Account
            </h2>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="w-full mt-[2rem]"
          >
            <FormItem
              name="fullName"
              label={<span className="text-[1.6rem]">Full Name</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input className="p-3 rounded-[1rem]" />
            </FormItem>

            <FormItem
              name="email"
              label={<span className="text-[1.6rem]">Email Address</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                className="p-3 rounded-[1rem]"
                onBlur={(e) => {
                  const trimmedValue = e.target.value.trim();
                  form.setFieldsValue({ email: trimmedValue });
                }}
              />
            </FormItem>

            <Form.Item
              label={<span className="text-[1.6rem]">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="p-3 rounded-[1rem]" />
            </Form.Item>

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
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-[0.8rem] w-[32.7rem]">
            <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
              Have an Account?
              <Link
                to="/login"
                className="font-[500] text-primaryColor cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="lg:w-[50%] hidden lg:flex bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('../../../public/svgs/signup_image.svg')",
        }}
      ></div>
    </div>
  );
};

export default CreateAccount;
