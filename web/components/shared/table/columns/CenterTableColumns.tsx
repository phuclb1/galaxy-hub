import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/lib/constants";
import { TrainingCenter } from "@/lib/schemas/training-center";
import { createColumnHelper, Table } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ConfirmPopover } from "../../ConfirmPopover";
import { api } from "@/protocol/trpc/client";
import { toast } from "sonner";
import formatDate from "../../FormatDate";

const col = createColumnHelper<TrainingCenter>();

const HeaderCheckbox = ({ table }: { table: Table<TrainingCenter> }) => {
  const isAllCentersSelected = table.getIsAllRowsSelected();
  const isSelectedAllCentersChange = table.getToggleAllRowsSelectedHandler();
  const isSomeCentersSelected = table.getIsSomeRowsSelected();

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeCentersSelected;
    }
  }, [isSomeCentersSelected]);

  return (
    <input
      ref={headerCheckboxRef}
      checked={isAllCentersSelected}
      onChange={isSelectedAllCentersChange}
      type="checkbox"
    />
  );
};

export const centerTableColumns = [
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
  col.accessor("name", {
    header: "Name",
    cell: ({ getValue, row }) => (
      <Link
        className="underline hover:no-underline"
        href={ROUTE.HOME.trainingcenter.detail.path(row.original.id)}
      >
        {getValue()}
      </Link>
    ),
  }),
  col.accessor("address", { header: "Address" }),
  col.accessor("type", { header: "Type" }),
  col.accessor("department", { header: "Department" }),
  col.accessor("manager", {
    header: "Manager",
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
        api.center.delete.useMutation({
          onSuccess() {
            toast.success(`Center ${row.original.name} deleted`);
            utils.center.list.invalidate();
          },
        });
      return (
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={ROUTE.HOME.trainingcenter.edit.path(centerId)}>
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
