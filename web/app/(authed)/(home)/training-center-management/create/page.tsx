import { BackButton } from "@/components/shared/BackButton";
import { CenterFormProvider } from "../_component/CenterFormProvider";
import { CenterForm } from "../_component/CenterForm";
import { CenterFormSubmitButton } from "../_component/CenterFormSubmitButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <CenterFormProvider mode="CREATE">
        <CenterForm />
        <CenterFormSubmitButton className="w-fit" />
      </CenterFormProvider>
    </div>
  );
}
