import { useState } from "react";
import { AiOutlineCamera, AiOutlineUser } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiEdit, FiUser } from "react-icons/fi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import UserDetail from "./UserDetail";
import { UserDetails } from "../types/UserDetails";
import logo from "../../public/svgs/gd_logo.svg";

const Profile = () => {
  const [details, setDetails] = useState<UserDetails>({
    name1: "Pelz Ade",
    email1: "greatdaymotor@gmail.com",
    gender1: "Male",
    phone1: "08126899573",
    name2: "Enter name",
    email2: "Enter email",
    gender2: "Select a gender",
    phone2: "Enter phone number",
    name3: "Enter name",
    email3: "Enter email",
    gender3: "Select a gender",
    phone3: "Enter phone number",
  });

  const genderOptions = ["Male", "Female"];

  const handleDetailChange = (key: string, newDetail: string) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: newDetail,
    }));
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-[1.2rem]">
        <h3 className="text-[1.8rem] font-[700]"> Edit Profile</h3>
        <div className="w-[8.5rem] h-[8.5rem] rounded-full relative cursor-pointer">
          <img
            src={selectedImage || logo}
            alt="Profile"
            className="w-[8.5rem] h-[8.5rem] rounded-full"
          />
          <label
            htmlFor="imageInput"
            className="w-[4rem] h-[4rem] bg-textGray rounded-full flex justify-center items-center absolute bottom-0 -right-5 cursor-pointer"
          >
            <AiOutlineCamera size={24} color="#2F2FC8" />
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="mt-[2.2rem] flex flex-col gap-[3.2rem]">
        {[
          {
            title: "Personal Information",
            keys: ["name1", "email1", "gender1", "phone1"],
          },
          {
            title: "Next-of-Kin Information",
            keys: ["name2", "email2", "gender2", "phone2"],
          },
          {
            title: "Beneficiary Information",
            keys: ["name3", "email3", "gender3", "phone3"],
          },
        ].map((section, index) => (
          <div
            key={section.title}
            className="flex flex-col gap-[0.8rem] w-full"
          >
            <p className="text-[1.4rem] font-[700]">{section.title}</p>
            {section.keys.map((key) => (
              <UserDetail
                key={key}
                name={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? "Email"
                    : key.includes("gender")
                    ? "Gender"
                    : "Phone Number"
                }
                inputLabel={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? index === 0
                      ? "Email"
                      : "Email"
                    : key.includes("gender")
                    ? "Gender"
                    : "Phone Number"
                }
                detail={details[key as keyof UserDetails]}
                detailEditLabel={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? index === 0
                      ? "Email"
                      : "Email"
                    : key.includes("gender")
                    ? "Gender"
                    : "Phone Number"
                }
                Icon={
                  key.includes("phone")
                    ? MdOutlinePhoneInTalk
                    : key.includes("gender")
                    ? AiOutlineUser
                    : key.includes("email")
                    ? CiMail
                    : FiUser
                }
                EditIcon={key.includes("email") && index === 0 ? null : FiEdit}
                onDetailChange={
                  key.includes("email") && index === 0
                    ? undefined
                    : (newDetail) => handleDetailChange(key, newDetail)
                }
                selectOptions={
                  key.includes("gender") ? genderOptions : undefined
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
