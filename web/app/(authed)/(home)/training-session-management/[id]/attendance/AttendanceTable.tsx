"use client";

import {
  TableFilter,
  TableSearchAtom,
} from "@/components/shared/table/TableFilter";
import { useTable } from "@/components/shared/table/useTable";
import { usePagination } from "@/lib/params";
import { api } from "@/protocol/trpc/client";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { attendanceTableColumns } from "./_component/AttendanceColumn";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import { SelectDate } from "./_component/SelectDate";
import { format } from "date-fns";

interface TableProps {
  session_id: string;
}

export function AttendanceTable({ session_id }: TableProps) {
  const [pagination, setPagination] = usePagination();
  const query = useAtomValue(TableSearchAtom);
  const [filterDate, setFilterDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const { data: queryData } = api.attendance.list_by_session.useQuery({
    ...pagination,
    query,
    session_id,
    filter_date: filterDate,
  });
  const data = useMemo(() => queryData?.attendances ?? [], [queryData]);

  const { table } = useTable({
    data,
    columns: attendanceTableColumns,
    pagination: { pagination, setPagination },
    total: queryData?.total,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TableFilter className="w-100" disabled />
          <SelectDate selectedDate={filterDate} onDateChange={setFilterDate} />
        </div>
      </div>
      <DataTable table={table} />
      <div className="flex">
        <DataTablePagination className="flex-1" table={table} />
      </div>
    </div>
  );
}
