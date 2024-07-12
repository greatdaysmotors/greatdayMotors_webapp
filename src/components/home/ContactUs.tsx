import Container from "@layouts/Container";
import { Button, Form, Input } from "antd";
import contactimage from "../../../public/pngs/contactimg.png";

const ContactUs = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full pb-[2.4rem] md:pb-[4rem]  lg:pb-[8rem]  md:mx-auto lg:w-full">
        <p className="text-[1.2rem] lg:text-[1.4rem] text-primaryColor font-[700]">
          Contact Us
        </p>
        <h2 className="text-[2rem] md:text-[2.4rem] lg:text-[3.2rem] font-[700] text-brandBlack text-center lg:text-left">
          Want To Get In Touch With Us?
        </h2>

        <div className="flex flex-col-reverse md:flex-row gap-[2rem] md:gap-[4rem] lg:gap-[6rem] items-center w-full">
          <Form name="contact" layout="vertical" className="w-full lg:w-[50%]">
            <Form.Item
              label={<span className="text-[1.6rem] font-[500]">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input className="p-[10px] border border-gray100 rounded-[10px] outline-none" />
            </Form.Item>

            <Form.Item
              label={<span className="text-[1.6rem] font-[500]">Email</span>}
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                className="p-[10px] border border-gray100 rounded-[10px] outline-none"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[1.6rem] font-[500]">
                  What do you have in mind for us?
                </span>
              }
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <Input.TextArea
                rows={6}
                cols={4}
                className="p-[10px] border border-gray100 rounded-[10px] outline-none"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="p-[2rem] font-[400] mt-[2rem] md:mt-[32px] text-[1.6rempx] rounded-[10px] w-full"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>

          <div
            style={{ position: "relative" }}
            className=" w-full flex lg:w-[50%] mt-[24px]"
          >
            <img
              src={contactimage}
              alt="contact-image"
              className="w-full h-auto rounded-[8px] object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
