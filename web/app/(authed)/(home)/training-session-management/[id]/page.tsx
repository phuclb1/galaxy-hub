import { BackButton } from "@/components/shared/BackButton";
import { ROUTE } from "@/lib/constants";
import { api } from "@/protocol/trpc/server";
import { TrainingSessionDetail } from "../_component/TrainingSessionDetail";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  const data = await api.training_session.detail({ id });
  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton href={ROUTE.HOME.trainingsession.root.path} />
      </div>
      <TrainingSessionDetail session={data} />
    </div>
  );
}
