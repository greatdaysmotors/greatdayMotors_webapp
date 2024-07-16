import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAction from "./UserAction";

const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("authToken");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <UserAction
      loading={loading}
      title="Logout"
      message="Are you sure you want to log out of your account? Please be aware that
        logging out will terminate your current session and you will be required
        to sign in again to access your account. If you wish to proceed, please
        click 'Logout' below. If not, you may navigate away from this page to
        remain logged in."
      primaryActionLabel="Logout"
      secondaryActionLabel="Cancel"
      onPrimaryAction={handleLogout}
      onSecondaryAction={handleCancel}
    />
  );
};

export default LogOut;
