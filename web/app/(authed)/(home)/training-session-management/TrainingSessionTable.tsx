"use client";

import { trainingSessionTableColumns } from "@/components/shared/table/columns/TrainingSessionTableColumns";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import {
  TableFilter,
  TableSearchAtom,
} from "@/components/shared/table/TableFilter";
import { useTable } from "@/components/shared/table/useTable";
import { Button } from "@/components/ui/button";
import { ROUTE } from "@/lib/constants";
import { usePagination } from "@/lib/params";
import { api } from "@/protocol/trpc/client";
import { useAtomValue } from "jotai";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { MultiDeleteTrainingSessions } from "./_component/MultipleDeleteTrainingSession";

export function TrainingSessionTable() {
  const [pagination, setPagination] = usePagination();
  const query = useAtomValue(TableSearchAtom);
  const { data: queryData } = api.training_session.list.useQuery({
    ...pagination,
    query,
  });
  const data = useMemo(() => queryData?.training_sessions ?? [], [queryData]);

  const { table } = useTable({
    data,
    columns: trainingSessionTableColumns,
    pagination: { pagination, setPagination },
    total: queryData?.total,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TableFilter className="w-100" />

          <MultiDeleteTrainingSessions table={table} />
        </div>

        <Link className="ml-auto" href={ROUTE.HOME.trainingsession.create.path}>
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
