import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { TeamFormProvider } from "../../_component/TeamFormProvider";
import { TeamForm } from "../../_component/TeamForm";
import { TeamFormSubmitButton } from "../../_component/TeamFormSubmitButton";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  const data = await api.team.detail({ id });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>

      <TeamFormProvider defaultValues={data} mode="EDIT">
        <TeamForm />
        <TeamFormSubmitButton className="w-fit" />
      </TeamFormProvider>
    </div>
  );
}
