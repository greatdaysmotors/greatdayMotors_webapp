import { Button } from "antd";
import React from "react";

interface ModalProps {
  title?: string;
  message?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const UserAction: React.FC<ModalProps> = ({
  title = "Delete Account",
  message = "Are you certain you wish to proceed with deleting your account? Please note that this action is irreversible and will result in the permanent loss of all your account information. Your data cannot be recovered once the deletion process is complete. To confirm, please click 'Delete Account' below. If you wish to retain your account, you may navigate away from this page.",
  primaryActionLabel = "Delete Account",
  secondaryActionLabel = "Cancel",
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[1.6rem]">
      <h3 className="text-[1.8rem] md:text-[2.2rem] font-[700]">{title}</h3>
      <p className="text-[1.6rem] lg:text-[2rem] font-[500]">{message}</p>
      <div className="flex gap-[0.8rem] mt-[0.7rem] justify-center md:justify-end w-full">
        <Button
          className="w-[12.5rem] h-[3.2rem] text-[1.8rem] font-[400] text-[#fff] bg-brandErrorColor rounded-[1rem]"
          onClick={onPrimaryAction}
        >
          {primaryActionLabel}
        </Button>
        <Button
          className="w-[12.5rem] h-[3.2rem] text-[1.8rem] font-[400] rounded-[1rem]"
          onClick={onSecondaryAction}
        >
          {secondaryActionLabel}
        </Button>
      </div>
    </div>
  );
};

export default UserAction;
