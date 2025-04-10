import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { TrainingSessionDetail } from "../_component/TrainingSessionDetail";
import { DialogFeedback } from "../_component/feedback/DialogFeedback";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  const session_data = await api.training_session.detail({ id });
  const user_data = await api.auth.me();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>
      <TrainingSessionDetail session={session_data} />
      <DialogFeedback user={user_data} session={session_data} />
    </div>
  );
}
