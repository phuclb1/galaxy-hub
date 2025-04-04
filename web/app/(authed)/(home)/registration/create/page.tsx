import { BackButton } from "@/components/shared/BackButton";
import { ROUTE } from "@/lib/constants";
import { RegistrationFormProvider } from "../_component/RegistrationFormProvider";
import { RegistrationForm } from "../_component/RegistrationForm";
import { RegistrationFormSubmitButton } from "../_component/RegistrationFormSubmitButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BackButton href={ROUTE.HOME.registration.root.path} />
      <RegistrationFormProvider mode="CREATE">
        <RegistrationForm />
        <RegistrationFormSubmitButton className="w-fit" />
      </RegistrationFormProvider>
    </div>
  );
}
