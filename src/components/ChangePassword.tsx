import { BASE_URL } from "@api/index";
import useAuthToken from "@hooks/useAuthToken";
import { useMutation } from "@tanstack/react-query";
import {
  change_password_axios_type,
  change_password_type,
  change_password_type_v2,
} from "../types/Trip";
import { Button, Form, Input, Spin } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

interface ErrorResponse {
  message: string;
}

const ChangePassword = () => {
  const [update_button, set_update_button] =
    useState<string>("Update Password");
  const [updateRes, setUpdateRes] = useState<string>("");
  // const [messageTimeoutId, setMessageTimeoutId] =
  // useState<NodeJS.Timeout | null>(null);
  const [form] = Form.useForm();

  const userToken = useAuthToken();

  const [messageTimeoutId, setMessageTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  const { mutate, isPending } = useMutation<
    AxiosResponse<change_password_axios_type>, // Success type
    AxiosError<ErrorResponse>, // Error type
    change_password_type_v2 // Payload type
  >({
    mutationFn: (payload: change_password_type_v2) =>
      axios.put<change_password_axios_type>(
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
      setUpdateRes(response.data.message);
      set_update_button("Update Password");
      form.resetFields();

      // Clear any existing timeout
      if (messageTimeoutId) {
        clearTimeout(messageTimeoutId);
      }
      const timeoutId = setTimeout(() => setUpdateRes(""), 3000);
      setMessageTimeoutId(timeoutId);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred, please try again";
      setUpdateRes(errorMessage);
      set_update_button("Update Password");
      console.error("error changing password:", error);
    },
  });

  const handleFinish = (values: change_password_type) => {
    mutate({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[1.2rem]">
      <h3 className="text-[1.8rem] font-[700]">Change Password</h3>
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

        {updateRes && (
          <p
            className={
              updateRes === "Password updated successfully!"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {updateRes}
          </p>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primaryColor py-[2rem] text-white w-full rounded-[1rem] duration-500"
          >
            {isPending ? <Spin className="custom-spin" /> : update_button}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
