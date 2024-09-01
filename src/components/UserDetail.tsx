import React, { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";
import { UserDetailProps } from "../types/UserDetailProps";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@api/index";
import {
  profile_fullName,
  profile_nokEmail,
  profile_nokFullName,
  profile_nokPhoneNumber,
  profile_phoneNumber,
} from ".././types/UserDetails";


const UserDetail: React.FC<UserDetailProps> = ({
  section,
  name,
  detail,
  detailEditLabel = "Detail",
  Icon,
  EditIcon,
  iconSize = 24,
  editIconSize = 16,
  editIconColor = "#2F2FC8",
  onDetailChange,
  inputLabel,
  isEditable = true,
}) => {
  useEffect(() => {
    const theUserToken = sessionStorage.getItem("authToken")
      ? sessionStorage.getItem("authToken")
      : localStorage.getItem("authToken");
    if (theUserToken) {
      console.log(theUserToken, "from uncle");
      setUserToken(theUserToken);
    } else {
      console.error("No auth token found in sessionStorage.");
    }
  }, []);

  const userDetailsString =
    localStorage.getItem("userDetails") ||
    sessionStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

  const [userToken, setUserToken] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editValue, setEditValue] = useState(detail);

  const showModal = () => {
    setEditValue(detail);
    setIsModalVisible(true);
  };

  const [btn_text, set_btn_text] = useState<string>("save");

  const handleOk = (label: string | undefined) => {

    // form.validateFields().then(() => {
  
    // }).catch(() => {
    //   set_btn_text("Validation failed!");
    // });

    if (onDetailChange) {
      console.log(label);
      console.log(section, " section");

      onDetailChange(editValue);
      switch (true) {
        case label === "Name" && section === "Personal Information":
          mutate({
            fullName: editValue,
          });
          break;

        case label === "Phone Number" && section === "Personal Information":
          mutate({
            phoneNumber: editValue,
          });
          break;

        case label === "Name" && section === "Next-of-Kin Information":
          mutate({
            nokFullName: editValue,
          });
          break;

        case label === "Email" && section === "Next-of-Kin Information":
          mutate({
            nokEmail: editValue,
          });
          break;

        case label === "Phone Number" && section === "Next-of-Kin Information":
          mutate({
            nokPhoneNumber: editValue,
          });
          break;

        default:
          console.log("No matching case found.");
          break;
      }
      set_btn_text("updated succesfully!");
      if (label === "Name" && section === "Personal Information") {
        sessionStorage.setItem(
          "userDetails",
          JSON.stringify({
            ...userDetails,
            fullName: editValue,
          })
        );
      }
      return;
    }
 

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const { mutate, isError, isPending, isSuccess } = useMutation({
  const { mutate, isPending } = useMutation({
    mutationFn: async (
      formData:
        | profile_fullName
        | profile_nokEmail
        | profile_nokFullName
        | profile_nokPhoneNumber
        | profile_phoneNumber
    ) => {
      console.log("formData before sending:", formData);
      const response = await fetch(
        `${BASE_URL}/v1/passenger/passengers/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "profile n ot updated");
      }

      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        setIsModalVisible(false);
        set_btn_text("save");
      }, 2000);
    },
    onError: () => {
      set_btn_text("not successful!");
    },
  });

  return (
    <div className="flex gap-[1.6rem] w-full">
      {Icon && <Icon size={iconSize} className="lg:hidden" />}
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <p className="text-[1.4rem] font-[600]">{name}</p>
          <p className="text-[1.4rem] font-[400] text-textDeepGray">{detail}</p>
        </div>
        <div className="flex items-center">
          {isEditable && EditIcon && EditIcon !== null && (
            <EditIcon
              size={editIconSize}
              color={editIconColor}
              onClick={showModal}
              className="cursor-pointer ml-2"
            />
          )}
        </div>
      </div>
    
        <Modal
          centered
          title={
            <p className="text-center text-[1.8rem] font-[700]">{`Edit ${detailEditLabel}`}</p>
          }
          visible={isModalVisible}
          onOk={() => handleOk(inputLabel)}
          onCancel={handleCancel}
          footer={[
            !isPending ? (
              <Button
                key="save"
                type="primary"
                onClick={() => handleOk(inputLabel)}
                className="w-full"
              >
                {btn_text}
              </Button>
            ) : (
              <Button
                // disabled
                type="primary"
                loading
                iconPosition="start"
              >
                Loading
              </Button>
            ),
          ]}
          width={400}
        >
          <label htmlFor="inputLabel" className="text-[1.6rem] font-[400]">
            {inputLabel}
          </label>

        
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={`Enter ${detailEditLabel.toLowerCase()}`}
              className="text-textDeepGray"
            />
      
        </Modal>
     
    </div>
  );
};

export default UserDetail;
