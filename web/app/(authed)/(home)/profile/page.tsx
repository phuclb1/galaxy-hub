import { api } from "@/protocol/trpc/server";
import { InfoCard } from "../people-management/_component/InfoCard";
import { BackButton } from "@/components/shared/BackButton";

export default async function Page() {
  const me = await api.auth.me();
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <InfoCard user={me} />
    </div>
  );
}
