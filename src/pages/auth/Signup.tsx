import PrimaryBtn from "@components/button/PrimaryBtn";
import { Link } from "react-router-dom";
import logo from "../../../public/svgs/gd_logo.svg";

const SignUp = () => {
  
  return (
    <div className="flex w-full h-screen justify-center">
      <div className="lg:w-[50%] flex lg:justify-center lg:items-center px-[2.4rem]">
        <div className=" flex flex-col justify-center items-center w-full md:w-[45rem] h-screen">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="w-[28rem]">
            <h2 className="text-[2rem] lg:text-[3.2rem] font-[700] leading-[2.6rem] mt-[2rem] text-center text-brandBlack">
              Welcome To Great Day Motors
            </h2>
            <h4 className="text-[1.6rem] font-[500] leading-[2rem] mt-[0.4rem] text-center text-brandBlack">
              One of the best transportation companies in Africa
            </h4>
          </div>
          <div className="mt-[5rem] w-full flex flex-col gap-[16px]">
            <PrimaryBtn
              to="/register"
              className="bg-primaryColor text-white  duration-500"
            >
              Create Account
            </PrimaryBtn>
            <div className="flex justify-center items-center  gap-[1.6rem]">
              <div className="w-[10rem] h-[0.1rem] bg-brandBlack" />
              <p className="text-[1.4rem] text-brandBlack font-[700]">Or</p>
              <div className="w-[10rem] h-[0.1rem] bg-brandBlack" />
            </div>
            <PrimaryBtn
              to="/login"
              className="border border-primaryColor text-primaryColor"
            >
              Login
            </PrimaryBtn>
          </div>
          <div className="mt-[5rem] w-[32.7rem]">
            <p className="text-[1.4rem] text-brandBlack text-center">
              By Continuing, you agree with our{" "}
              <span className="font-[700] cursor-pointer underline">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="font-[700] cursor-pointer underline">
                Privacy Policy.
              </span>
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

export default SignUp;
