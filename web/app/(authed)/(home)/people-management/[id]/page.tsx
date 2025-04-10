import { api } from "@/protocol/trpc/server";
import { InfoCard } from "../_component/InfoCard";
import { BackButton } from "@/components/shared/BackButton";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<Record<"id", string>>;
}>) {
  const id = (await params).id;
  const user = await api.user.detail({ id });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>

      <InfoCard user={user} />
    </div>
  );
}
