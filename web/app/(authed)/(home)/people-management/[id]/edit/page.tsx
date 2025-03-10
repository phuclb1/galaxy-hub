import { ROUTE } from "@/lib/constants";
import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { CenterFormProvider } from "../../../training-center-management/_component/CenterFormProvider";
import { CenterForm } from "../../../training-center-management/_component/CenterForm";
import { CenterFormSubmitButton } from "../../../training-center-management/_component/CenterFormSubmitButton";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<Record<"id", string>>;
}>) {
  const id = (await params).id;
  const data = await api.center.detail({ id });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <BackButton href={ROUTE.HOME.humanresource.root.path} />
      </div>
      <CenterFormProvider defaultValues={data} mode="EDIT">
        <CenterForm />
        <CenterFormSubmitButton className="w-fit" />
      </CenterFormProvider>
    </div>
  );
}
