"use client";

import { TableSearchAtom } from "@/components/shared/table/TableFilter";
import { useTable } from "@/components/shared/table/useTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePagination } from "@/lib/params";
import { TrainingSession } from "@/lib/schemas/trainingsession";
import { cn } from "@/lib/utils";
import { api } from "@/protocol/trpc/client";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { ComponentPropsWithRef, useMemo } from "react";
import { studentApprovedColumns } from "./StudentApprovedColumn";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";

export function TrainingSessionDetail({
  session,
  className,
  ...props
}: {
  session: TrainingSession;
} & ComponentPropsWithRef<"div">) {
  const [pagination, setPagination] = usePagination();
  const query = useAtomValue(TableSearchAtom);
  const { data: queryData } = api.registration.list.useQuery({
    ...pagination,
    query,
  });
  const data = useMemo(
    () =>
      queryData?.registrations?.filter(
        (fil) => fil.status === "Approved" && fil.session.id === session.id
      ) ?? [],
    [queryData]
  );

  const { table } = useTable({
    data,
    columns: studentApprovedColumns,
    pagination: { pagination, setPagination },
    total: queryData?.total,
  });
  return (
    <div className="flex flex-col gap-2">
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Training Session Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {session.name}</div>
              <div>
                Start date: {format(new Date(session.start_date), "dd-MM-yyyy")}
              </div>
              <div>Training Session Type: {session.session_type}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="font-semibold">Training Session Student</div>
      <DataTable table={table} />
      <div className="flex">
        <DataTablePagination className="flex-1" table={table} />
      </div>
    </div>
  );
}
