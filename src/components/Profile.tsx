import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiEdit, FiUser } from "react-icons/fi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import UserDetail from "./UserDetail";
import { profile, UserDetails } from "../types/UserDetails";
import logo from "../../public/svgs/gd_logo.svg";
// import { BASE_URL } from "@api/index";
// import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useUserProfile } from "@hooks/useUserProfile";
import useAuthToken from "@hooks/useAuthToken";

const Profile = () => {
  const userToken = useAuthToken();
  const { data, error, isLoading } = useUserProfile(userToken);

  // const [the_profile, set_the_profile]= useState<profile>(
  //   {
  //     createdAt: "",
  //     email: "",
  //     emailVerified: false,
  //     fullName:"",
  //     gender: "",
  //     isDeleted: false,
  //     isOnline: false,
  //     nokEmail: "",
  //     nokFullName: "",
  //     nokPhoneNumber: "",
  //     phoneNumber: "",
  //     photoURL: "",
  //     registerStatus: "",
  //     status: "",
  //     updatedAt: "",
  //     __v: 0,
  //     _id: "",
  //   }
  // )

  const [details, setDetails] = useState<UserDetails>({
    name1: "",
    email1: "",
    phone1: "",
    name2: "",
    email2: "",
    phone2: "",
  });

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

  useEffect(() => {
    if (data) {
      const profile_object: profile = data.userProfile;
      console.log(profile_object);
      console.log(profile_object.fullName);
      setDetails({
        name1: profile_object.fullName,
        email1: profile_object.email,
        phone1: profile_object.phoneNumber,
        name2: profile_object.nokFullName,
        email2: profile_object.nokEmail,
        phone2: profile_object.nokPhoneNumber,
      });
    }
  }, [data]);

  if (error) {
    console.error("Error fetching terminals:", error);
    return <div>There was an error: {(error as Error).message}</div>;
  }

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-8">
        <Spin />
      </div>
    );

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
            keys: ["name1", "email1", "phone1"],
          },
          {
            title: "Next-of-Kin Information",
            keys: ["name2", "email2", "phone2"],
          },
        ].map((section) => (
          <div
            key={section.title}
            className="flex flex-col gap-[0.8rem] w-full"
          >
            <p className="text-[1.4rem] font-[700]">{section.title}</p>
            {section.keys.map((key) => (
              <UserDetail
                section={section.title}
                key={key}
                name_v2={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? "Email"
                    : "Phone"
                }
                name={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? "Email"
                    : "Phone Number"
                }
                inputLabel={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? "Email"
                    : "Phone Number"
                }
                detail={details[key as keyof UserDetails]}
                detailEditLabel={
                  key.includes("name")
                    ? "Name"
                    : key.includes("email")
                    ? "Email"
                    : "Phone Number"
                }
                Icon={
                  key.includes("phone")
                    ? MdOutlinePhoneInTalk
                    : key.includes("email")
                    ? CiMail
                    : FiUser
                }
                EditIcon={FiEdit}
                isEditable={key === "email2" || !key.includes("email")}
                onDetailChange={(newDetail) =>
                  handleDetailChange(key, newDetail)
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
