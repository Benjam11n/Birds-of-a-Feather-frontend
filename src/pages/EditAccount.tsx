import EditAvatarForm from "@/features/users/EditAvatarForm";
import EditEmailForm from "@/features/users/EditEmailForm";
import EditPasswordForm from "@/features/users/EditPasswordForm";
import EditUsernameForm from "@/features/users/EditUsernameForm";

function EditAccount() {
  return (
    <div className="flex flex-col space-y-6 justify-start">
      <EditEmailForm />
      <EditPasswordForm />
      <EditUsernameForm />
      <EditAvatarForm />
    </div>
  );
}

export default EditAccount;
