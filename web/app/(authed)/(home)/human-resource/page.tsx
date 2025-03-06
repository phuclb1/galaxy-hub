import { TableFilter } from "@/components/shared/table/TableFilter";
import { UserTable } from "./UserTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ROUTE } from "@/lib/constants";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold">Human Resource</span>

      <UserTable />
    </div>
  );
}
