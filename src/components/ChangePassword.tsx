import { Button, Form, Input } from "antd";

const ChangePassword = () => {
  const [form] = Form.useForm();
  return (
    <div className="flex flex-col justify-center items-center gap-[1.2rem]">
      <h3 className="text-[1.8rem] font-[700]"> Change Password</h3>
      <Form
        form={form}
        layout="vertical"
        // onFinish={handleFinish}
        className="w-full mt-[2rem] flex flex-col gap-[1rem]"
      >
        <Form.Item
          label={<span className="text-[1.6rem]">Old Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="p-3 rounded-[1rem]" />
        </Form.Item>
        <Form.Item
          label={<span className="text-[1.6rem]">New Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="p-3 rounded-[1rem]" />
        </Form.Item>
        <Form.Item
          label={<span className="text-[1.6rem]">Confirm New Password</span>}
          name="password"
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
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
