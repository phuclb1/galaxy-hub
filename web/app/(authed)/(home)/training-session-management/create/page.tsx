import { BackButton } from "@/components/shared/BackButton";
import { TrainingSessionFormProvider } from "../_component/TrainingSessionFormProvider";
import { TrainingSessionForm } from "../_component/TrainingSessionForm";
import { TrainingSessionFormSubmitButton } from "../_component/TrainingSessionFormSubmitButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <TrainingSessionFormProvider mode="CREATE">
        <TrainingSessionForm />
        <TrainingSessionFormSubmitButton className="w-fit" />
      </TrainingSessionFormProvider>
    </div>
  );
}
