import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input} from "antd";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";














const ChangePassword = () => {




  interface change_password_type{
    oldPassword:string;
    newPassword:string;
    confirmPassword:string
  }
  interface change_password_type_v2{
    oldPassword:string;
    newPassword:string;
  
  }
  
  const [update_button,set_update_button]=useState<string>("Update Password")
  
  
  const userToken = useAuthToken();
  
  
  const { mutate, isError, isPending } = useMutation<
  AxiosResponse<any> , // Success type
  Error, // Error type
  change_password_type_v2 // Payload type
  >({
  mutationFn: (payload: change_password_type_v2) =>
    axios.put<any>(
      `${BASE_URL}/v1/passenger/passengers/profile`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ),
  onSuccess: (response) => {
    console.log("onSuccess_response_password change", response);
    set_update_button(response.data.message)
  
  
  },
  onError: (error) => {
    set_update_button("An error occured, go again")
    console.error("error changing password:", error);
  },
  });
  
  
  
  
  
  
  
  
  
  
  const handleFinish =(values:change_password_type)=>{
  
    mutate({
      oldPassword:values.oldPassword,
      newPassword:values.newPassword
    })
  }
  
  
  




  const [form] = Form.useForm();




  return (
    <div className="flex flex-col justify-center items-center gap-[1.2rem]">
      <h3 className="text-[1.8rem] font-[700]"> Change Password</h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="w-full mt-[2rem] flex flex-col gap-[1rem]"
      >
        <Form.Item
          label={<span className="text-[1.6rem]">Old Password</span>}
          name="oldPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="p-3 rounded-[1rem]" />
        </Form.Item>
        <Form.Item
          label={<span className="text-[1.6rem]">New Password</span>}
          name="newPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="p-3 rounded-[1rem]" />
        </Form.Item>
        <Form.Item
          label={<span className="text-[1.6rem]">Confirm New Password</span>}
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="p-3 rounded-[1rem]" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primaryColor py-[2rem] text-white w-full rounded-[1rem] duration-500 "
          >
            {
              isPending ? "loading": isError ? update_button :update_button
            }
            
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
