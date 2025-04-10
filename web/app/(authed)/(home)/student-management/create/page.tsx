import { BackButton } from "@/components/shared/BackButton";
import { StudentFormProvider } from "../_component/StudentFormProvider";
import { StudentForm } from "../_component/StudentForm";
import { StudentFormSubmitButton } from "../_component/StudentFormSubmitButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <StudentFormProvider mode="CREATE">
        <StudentForm />
        <StudentFormSubmitButton className="w-fit" />
      </StudentFormProvider>
    </div>
  );
}
