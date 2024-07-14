import UserAction from "./UserAction";

const LogOut: React.FC = () => {
  const handleLogout = () => {
    // Your logout logic here
    console.log("Log out successfuly!");
  };

  const handleCancel = () => {
    // Your cancel logic here
    console.log("Delete action cancelled");
  };
  return (
    <UserAction
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
