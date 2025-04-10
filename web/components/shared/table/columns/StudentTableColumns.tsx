import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/lib/constants";
import { api } from "@/protocol/trpc/client";
import { createColumnHelper, Table } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ConfirmPopover } from "../../ConfirmPopover";
import { Student } from "@/lib/schemas/students";
import formatDate from "../../FormatDate";

const col = createColumnHelper<Student>();

const HeaderCheckbox = ({ table }: { table: Table<Student> }) => {
  const isAllStudentsSelected = table.getIsAllRowsSelected();
  const isSelectedAllStudentsChange = table.getToggleAllRowsSelectedHandler();
  const isSomeStudentsSelected = table.getIsSomeRowsSelected();

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeStudentsSelected;
    }
  }, [isSomeStudentsSelected]);

  return (
    <input
      ref={headerCheckboxRef}
      checked={isAllStudentsSelected}
      onChange={isSelectedAllStudentsChange}
      type="checkbox"
    />
  );
};

export const studentTableColumns = [
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
  col.accessor("user", {
    header: "User Name",
    cell: ({ getValue, row }) => {
      const val = getValue();
      return (
        <Link
          className="underline hover:no-underline"
          href={ROUTE.HOME.student.detail.path(row.original.id)}
        >
          {val?.name || "null"}
        </Link>
      );
    },
  }),
  col.accessor("team", {
    header: "Team",
    cell: ({ getValue }) => {
      const val = getValue();
      return val?.name || "null";
    },
  }),
  col.accessor("parent", {
    header: "Parent",
    cell: ({ getValue }) => {
      const val = getValue();
      return val?.name || "null";
    },
  }),
  col.accessor("created_at", {
    header: "Created at",
    cell: ({ getValue }) => {
      const val = getValue();
      return formatDate(val);
    },
  }),
  col.accessor("updated_at", {
    header: "Updated at",
    cell: ({ getValue }) => {
      const val = getValue();
      return formatDate(val);
    },
  }),
  col.display({
    id: "action",
    size: 100,
    minSize: 100,
    cell: function Action({ row }) {
      const centerId = row.original.id;
      const utils = api.useUtils();
      const { mutate: doDelete, isPending: isDeleting } =
        api.student.delete.useMutation({
          onSuccess() {
            toast.success(`Student ${row.original.user.name} deleted`);
            utils.center.list.invalidate();
          },
        });
      return (
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={ROUTE.HOME.student.edit.path(centerId)}>
                <Button size="icon" variant="ghost">
                  <Pencil />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>

          <Tooltip>
            <ConfirmPopover
              asChild
              onConfirm={() => doDelete({ ids: [centerId] })}
              variant="destructive"
            >
              <TooltipTrigger asChild>
                <Button disabled={isDeleting} size="icon" variant="ghost">
                  <Trash2 className="text-destructive" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  }),
];
