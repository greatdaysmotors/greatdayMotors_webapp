import UserAction from "./UserAction";

const DeleteAccount: React.FC = () => {
  const handleDelete = () => {
    // Your delete logic here
    console.log("Account deleted");
  };

  const handleCancel = () => {
    // Your cancel logic here
    console.log("Delete action cancelled");
  };
  return (
    <UserAction
      title="Delete Account"
      message="Are you certain you wish to proceed with deleting your account? Please note that this action is irreversible and will result in the permanent loss of all your account information. Your data cannot be recovered once the deletion process is complete. To confirm, please click 'Delete Account' below. If you wish to retain your account, you may navigate away from this page."
      primaryActionLabel="Delete Account"
      secondaryActionLabel="Cancel"
      onPrimaryAction={handleDelete}
      onSecondaryAction={handleCancel}
    />
  );
};

export default DeleteAccount;
