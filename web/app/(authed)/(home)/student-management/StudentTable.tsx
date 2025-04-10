"use client";

import { studentTableColumns } from "@/components/shared/table/columns/StudentTableColumns";
import {
  TableFilter,
  TableSearchAtom,
} from "@/components/shared/table/TableFilter";
import { useTable } from "@/components/shared/table/useTable";
import { usePagination } from "@/lib/params";
import { api } from "@/protocol/trpc/client";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { MultiDeleteStudents } from "./_component/MultipleDeleteStudent";
import Link from "next/link";
import { ROUTE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";

export function StudentTable() {
  const [pagination, setPagination] = usePagination();
  const query = useAtomValue(TableSearchAtom);
  const { data: queryData } = api.student.list.useQuery({
    ...pagination,
    query,
  });
  const data = useMemo(() => queryData?.students ?? [], [queryData]);

  const { table } = useTable({
    data,
    columns: studentTableColumns,
    pagination: { pagination, setPagination },
    total: queryData?.total,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TableFilter className="w-100" disabled />

          <MultiDeleteStudents table={table} />
        </div>

        <Link className="ml-auto" href={ROUTE.HOME.student.create.path}>
          <Button>
            <PlusCircle />
            New
          </Button>
        </Link>
      </div>
      <DataTable table={table} />
      <div className="flex">
        <DataTablePagination className="flex-1" table={table} />
      </div>
    </div>
  );
}
