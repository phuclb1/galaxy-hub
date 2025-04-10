import { BackButton } from "@/components/shared/BackButton";
import { UserFormProvider } from "../_component/UserFormProvider";
import { UserForm } from "../_component/UserForm";
import { UserFormSubmitButton } from "../_component/UserFormSubmitButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <UserFormProvider mode="CREATE">
        <UserForm />
        <UserFormSubmitButton className="w-fit" />
      </UserFormProvider>
    </div>
  );
}
