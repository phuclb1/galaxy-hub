import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { TeamCard } from "../_component/TeamCard";

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
      <TeamCard team={data} />
    </div>
  );
}
