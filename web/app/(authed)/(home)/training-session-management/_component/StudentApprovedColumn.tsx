import formatDate from "@/components/shared/FormatDate";
import { Badge } from "@/components/ui/badge";
import { ROUTE } from "@/lib/constants";
import { Registration } from "@/lib/schemas/registration";
import { createColumnHelper, Table } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useRef } from "react";

const col = createColumnHelper<Registration>();

const HeaderCheckbox = ({ table }: { table: Table<Registration> }) => {
  const isAllRegistrationsSelected = table.getIsAllRowsSelected();
  const isSelectedAllRegistrationsChange =
    table.getToggleAllRowsSelectedHandler();
  const isSomeRegistrationsSelected = table.getIsSomeRowsSelected();

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeRegistrationsSelected;
    }
  }, [isSomeRegistrationsSelected]);

  return (
    <input
      ref={headerCheckboxRef}
      checked={isAllRegistrationsSelected}
      onChange={isSelectedAllRegistrationsChange}
      type="checkbox"
    />
  );
};

export const studentApprovedColumns = [
  col.display({
    id: "select",
    header: ({ table }) => <HeaderCheckbox table={table} />,
    cell: ({ row }) => (
      <input
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        type="checkbox"
      />
    ),
  }),
  col.accessor("student", {
    header: "Name",
    cell: ({ getValue, row }) => {
      const val = getValue();
      return (
        <Link
          className="underline hover:no-underline"
          href={ROUTE.HOME.registration.detail.path(row.original.id)}
        >
          {val?.user?.name || "null"}
        </Link>
      );
    },
  }),
  col.accessor("session.coach", {
    header: "Coach",
    cell: ({ getValue }) => {
      const val = getValue();

      return val?.name || "null";
    },
  }),
  col.accessor("session.team", {
    header: "Team",
    cell: ({ getValue }) => {
      const val = getValue();

      return val?.name || "null";
    },
  }),
  col.accessor("session.start_date", {
    header: "Start Date",
    cell: ({ getValue }) => {
      const val = getValue();

      return formatDate(val);
    },
  }),
  col.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
  }),
];
