import { useState } from "react";
import UserAction from "./UserAction";
import useAuthToken from "@hooks/useAuthToken";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@api/index";
import toast, { Toaster } from 'react-hot-toast';


const DeleteAccount: React.FC = () => {


 


  
 
  

  // interface delete_type{
  //   account:string
  // }

  const [delete_button,set_delete_button]=useState<string>("Delete")
  
  
  const userToken = useAuthToken();
  
  
  // const { mutate, isError, isPending } = useMutation<
  const { mutate, isPending } = useMutation<
  AxiosResponse<any> , // Success type
  Error // Error type
  // delete_type // Payload type
  >({
  // mutationFn: (payload: delete_type) =>
  mutationFn: () =>
    axios.delete<any>(
      `${BASE_URL}/v1/passenger/passengers/account`,
      // payload,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    ),
  onSuccess: (response) => {
    console.log("onSuccess_response_deleted", response);
    toast(response.data.message)
    
  
  
  },
  onError: (error) => {
    set_delete_button("An error occured, go again")
    toast("error deleting account: "+ error)
    
  },
  });
  
  
  
  
  
  









  
  const handleDelete = () => {
    // Your delete logic here
    console.log("Account deleted");
    mutate()
  };

  const handleCancel = () => {
    // Your cancel logic here
    console.log("Delete action cancelled");
  };
  return (
<>
<Toaster />
    <UserAction
      title="Delete Account"
      message="Are you certain you wish to proceed with deleting your account? Please note that this action is irreversible and will result in the permanent loss of all your account information. Your data cannot be recovered once the deletion process is complete. To confirm, please click 'Delete Account' below. If you wish to retain your account, you may navigate away from this page."
      primaryActionLabel={isPending? "loading...":delete_button}
      secondaryActionLabel="Cancel"
      onPrimaryAction={handleDelete}
      onSecondaryAction={handleCancel}

    />
</>
  );
};

export default DeleteAccount;
