import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { StudentFormProvider } from "../../_component/StudentFormProvider";
import { StudentForm } from "../../_component/StudentForm";
import { StudentFormSubmitButton } from "../../_component/StudentFormSubmitButton";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  const data = await api.student.detail({ id });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>

      <StudentFormProvider defaultValues={data} mode="EDIT">
        <StudentForm />
        <StudentFormSubmitButton className="w-fit" />
      </StudentFormProvider>
    </div>
  );
}
