import { Button, Checkbox, Form, Input } from "antd";
import { use_round_trip } from "../../store/round_trip";
import FormItem from "antd/es/form/FormItem";
// import { InfoStepProps } from "../../types/InfoTypes";

interface InfoStepProps {
  handleStepCompletion: () => void;
  currentStep: number;
  numberOfBeneficiaries: number;
  numberOfAdults: number;
  numberOfChildren: number;
  the_trip_cost: number;
}

interface personal_info_form_type extends FormData {

  next_of_kin_email: string;
next_of_kin_name: string;
next_of_kin_phone_number: string;
send_next_kin_email: boolean;
}

export const Two_way_personal_info: React.FC<InfoStepProps> = ({
  handleStepCompletion,
  currentStep,
  numberOfAdults,
  the_trip_cost,
}) => {
  const userDetailsString =
    localStorage.getItem("userDetails") ||
    sessionStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  console.log("userDetails", userDetails);

  const tripDetails = use_round_trip((state) => state.round_trip_post_data);
  console.log("tripDetails", tripDetails);
  console.log("the_trip_cost", the_trip_cost);

  const setTripDetails = use_round_trip(
    (state) => state.set_round_trip_post_data
  );



const handle_step_one=(values:personal_info_form_type)=>{

  setTripDetails({
    ...tripDetails,
    totalTripCost: the_trip_cost * numberOfAdults,
    nextOfKinName: values.next_of_kin_name,
    nextOfKinPhoneNumber: values.next_of_kin_phone_number,
    nextOfKinEmail: values.next_of_kin_email,
    sendEmailToNextOfKin:values.send_next_kin_email === false ? "no":"yes",
  });
  handleStepCompletion()
}
  return (
    <Form
      className="flex flex-col mt-3"
      initialValues={{
        name: userDetails?.fullName,
        email: userDetails?.email,
        send_next_kin_email:false
      }}
      onFinish={handle_step_one}
    >
      <div className="md:flex md:gap-[2.4rem]">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
            Personal Information
          </h2>
          <div className="w-full flex flex-col gap-[1.6rem]">
            <FormItem
              name="name"
              label={
                <div className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]">
                  Passenger’s Name
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Name can only contain letters and spaces!',
                },
                {
                  min: 2,
                  message: 'Name must be at least 2 characters long!',
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your name"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </FormItem>

            <FormItem
              name="email"
              label={
                <div className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]">
                  Passenger’s Email
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter your email"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </FormItem>

            <FormItem
              name="phone_number"
              label={
                <div className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]">
                  Passenger’s Phone Number
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: /^(08|09|07)\d{9}$/, 
                  message: 'Please enter a valid phone number!',
                },
              ]}
            >
              <Input
                type="text"
                max={11}
                placeholder="Enter your phone number"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </FormItem>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-8 lg:mt-0">
          <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-[700]">
            Next-of-Kin Information
          </h2>
          <div className="w-full flex flex-col gap-[1.6rem]">
            <FormItem
              name="next_of_kin_name"
              label={
                <div className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]">
                  Next-of-Kin's Name
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input next of kin's name!",
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Name can only contain letters and spaces!',
                },
                {
                  min: 2,
                  message: 'Name must be at least 2 characters long!',
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter name"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </FormItem>

            <FormItem
              name="next_of_kin_email"
              label={
                <div className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]">
                  Next-of-Kin's Email
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input next of kin's email!",
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter email"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </FormItem>

            <FormItem
              name="next_of_kin_phone_number"
              label={
                <div className="text-[1.6rem] flex flex-col gap-[0.4rem] font-[500]">
                  Next-of-Kin's Phone Number
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input next of kin's phone number!",
                },
                {
                  pattern: /^(08|09|07)\d{9}$/, 
                  message: 'Please enter a valid phone number!',
                },
              ]}
            >
              <Input
              max={11}
                type="text"
                placeholder="Enter phone number"
                className="p-[0.8rem] rounded-[1rem] font-[400] border"
              />
            </FormItem>
          </div>
        </div>
      </div>

      <p className="text-[1.4rem] md:text-[1.8rem] mt-4  text-[#999999]">
        N/B: Please tick the box if you want your next-of-kin to get
        notification about the trip
      </p>

      <div className="flex  mt-3 gap-2 ">
        <Form.Item
          name="send_next_kin_email"
          label={
            <div className="text-[1.4rem] md:text-[1.8rem]  leading-[1.5rem] w-full">
              I want my next-of-kin to recieve an email about the trip
            </div>
          }
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          valuePropName="checked" 
        >
          <Checkbox />
        </Form.Item>
      </div>

      <hr className="my-[1.6rem]" />
      <div className="mt-4 flex flex-col justify-end items-end">
        <div className="flex flex-col gap-1">
          {numberOfAdults && numberOfAdults > 0 && (
            <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
              Adult Fare: ₦
              {the_trip_cost &&
                (the_trip_cost * numberOfAdults).toLocaleString()}
            </p>
          )}

          {/* <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
            Child Fare: ₦9,100
          </p> */}

          {numberOfAdults && (
            <p className="text-[1.4rem] md:text-[1.8rem]  font-[500]">
              Total Fare: ₦
              {the_trip_cost &&
                (the_trip_cost * numberOfAdults).toLocaleString()}
            </p>
          )}

          {currentStep <= 4 && (
            <Form.Item
            valuePropName="checked"
            >
              <Button
                htmlType="submit"
                key="submit"
                type="primary"
                className={`px-10 py-4 md:py-8 bg-primaryColor text-white rounded-[1rem] `}
              >
                Continue
              </Button>
            </Form.Item>
          )}
        </div>
      </div>
    </Form>
  );
};
