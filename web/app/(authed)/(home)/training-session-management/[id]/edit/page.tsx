import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { TrainingSessionFormProvider } from "../../_component/TrainingSessionFormProvider";
import { TrainingSessionForm } from "../../_component/TrainingSessionForm";
import { TrainingSessionFormSubmitButton } from "../../_component/TrainingSessionFormSubmitButton";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  const data = await api.training_session.detail({ id });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>

      <TrainingSessionFormProvider defaultValues={data} mode="EDIT">
        <TrainingSessionForm />
        <TrainingSessionFormSubmitButton className="w-fit" />
      </TrainingSessionFormProvider>
    </div>
  );
}
