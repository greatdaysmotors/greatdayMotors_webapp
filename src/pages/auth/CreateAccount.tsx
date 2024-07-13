import PrimaryBtn from "@components/button/PrimaryBtn";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";

const CreateAccount = () => {
  const AccountCreation = () => {
    alert("Account Creation");
  };
  return (
    <div className="flex w-full h-screen justify-center">
      <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem] overflow-scroll scroll-container">
        <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="w-[28rem]">
            <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
              Create Account
            </h2>
          </div>
          <Form
            layout="vertical"
            onFinish={AccountCreation}
            className="w-full mt-[2rem]"
          >
            <FormItem
              name="firstName"
              label={<span className="text-[1.6rem]">First Name</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input className="p-3 rounded-[1rem]" />
            </FormItem>
            <FormItem
              name="lastName"
              label={<span className="text-[1.6rem]">Last Name</span>}
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

            <Form.Item>
              <PrimaryBtn className="bg-primaryColor text-white  duration-500 mt-[26px] lg:mt-[34px]">
                Create Account
              </PrimaryBtn>
            </Form.Item>
          </Form>

          <div className="mt-[0.8rem] w-[32.7rem]">
            <p className="text-[1.4rem] flex gap-[0.5rem] justify-center items-center text-brandBlack ">
              Have an Account?
              <Link
                to="/login"
                className="font-[500] text-primaryColor cursor-pointer r"
              >
                Login
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

export default CreateAccount;
