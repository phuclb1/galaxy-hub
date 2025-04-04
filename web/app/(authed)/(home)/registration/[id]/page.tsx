import { api } from "@/protocol/trpc/server";
import { BackButton } from "@/components/shared/BackButton";
import { ROUTE } from "@/lib/constants";
import { RegistrationCard } from "../_component/RegistrationCard";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<Record<"id", string>>;
}>) {
  const id = (await params).id;
  const data = await api.registration.detail({ id });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton href={ROUTE.HOME.humanresource.root.path} />
      </div>
      <RegistrationCard registration={data} />
    </div>
  );
}
