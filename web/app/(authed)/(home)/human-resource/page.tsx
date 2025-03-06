import { UserTable } from "./UserTable";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold">Human Resource</span>

      <UserTable />
    </div>
  );
}
