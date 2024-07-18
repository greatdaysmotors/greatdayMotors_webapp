import React, { useState } from "react";
import { Modal, Select, Button, Input } from "antd";
import { UserDetailProps } from "../types/UserDetailProps";

const UserDetail: React.FC<UserDetailProps> = ({
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
  selectOptions,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editValue, setEditValue] = useState(detail);

  const showModal = () => {
    setEditValue(detail);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (onDetailChange) {
      onDetailChange(editValue);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex gap-[1.6rem] w-full">
      {Icon && <Icon size={iconSize} className="lg:hidden" />}
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <p className="text-[1.4rem] font-[600]">{name}</p>
          <p className="text-[1.4rem] font-[400] text-textDeepGray">{detail}</p>
        </div>
        <div className="flex items-center">
          {EditIcon && EditIcon !== null && (
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
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="save"
            type="primary"
            onClick={handleOk}
            className="w-full"
          >
            Save
          </Button>,
        ]}
        width={400}
      >
        <label htmlFor="inputLabel" className="text-[1.6rem] font-[400]">
          {inputLabel}
        </label>
        {selectOptions ? (
          <Select
            value={editValue}
            onChange={(value: string) => setEditValue(value)}
            placeholder={`Select a ${detailEditLabel.toLowerCase()}`}
            className="text-textDeepGray w-full"
          >
            {selectOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={`Enter ${detailEditLabel.toLowerCase()}`}
            className="text-textDeepGray"
          />
        )}
      </Modal>
    </div>
  );
};

export default UserDetail;
