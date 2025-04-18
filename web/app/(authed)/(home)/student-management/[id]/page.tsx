import { BackButton } from "@/components/shared/BackButton";
import { api } from "@/protocol/trpc/server";
import { StudentCard } from "../_component/StudentCard";

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
      <StudentCard student={data} />
    </div>
  );
}
