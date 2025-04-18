import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { CenterCard } from "../_component/CenterCard";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  const data = await api.center.detail({ id });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>

      <CenterCard center={data} />
    </div>
  );
}
