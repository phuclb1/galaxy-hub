import { BackButton } from "@/components/shared/BackButton";
import { AttendanceTable } from "./AttendanceTable";

export default async function Page({
  params,
}: Readonly<{ params: Promise<Record<"id", string>> }>) {
  const id = (await params).id;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <BackButton />
      </div>
      <AttendanceTable session_id={id} />
    </div>
  );
}
