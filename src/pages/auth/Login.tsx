import { Button, Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";
import { BASE_URL } from "@api/index";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      // Auto-login if token exists
      navigate("/");
    }
  }, [navigate]);

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("formData before sending:", formData);
      const response = await fetch(`${BASE_URL}/v1/auth/passenger/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in!");
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { token, userDetails } = data;

      if (rememberMe) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } else {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      }

      setSuccessMessage("Login successful!");

      form.resetFields();
      setTimeout(() => {
        navigate("/");
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

  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
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
              Login
            </h2>
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

            <Form.Item
              label={<span className="text-[1.6rem]">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="p-3 rounded-[1rem]" />
            </Form.Item>

            <div className="flex justify-between">
              <Form.Item>
                <Checkbox onChange={handleRememberMeChange}>
                  Remember me
                </Checkbox>
              </Form.Item>

              <Form.Item className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-primaryColor text-[1.3rem] hover:text-secondaryColor cursor-pointer font-semibold"
                >
                  Forgot Password?
                </Link>
              </Form.Item>
            </div>

            {isError && errorMessage && (
              <p className="text-center font-[600] text-brandErrorColor">{errorMessage}</p>
            )}

            {isSuccess && successMessage && (
              <p className="text-center font-[600] text-brandSuccessColor">
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
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-[0.8rem] w-[32.7rem]">
            <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
              Don’t Have an Account?
              <Link
                to="/register"
                className="font-[500] text-primaryColor cursor-pointer r"
              >
                Create Account
              </Link>
            </p>
          </div>
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

export default Login;
