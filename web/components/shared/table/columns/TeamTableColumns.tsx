import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/lib/constants";
import { Team } from "@/lib/schemas/teams";
import { api } from "@/protocol/trpc/client";
import { createColumnHelper, Table } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ConfirmPopover } from "../../ConfirmPopover";
import formatDate from "../../FormatDate";

const col = createColumnHelper<Team>();

const HeaderCheckbox = ({ table }: { table: Table<Team> }) => {
  const isAllTeamsSelected = table.getIsAllRowsSelected();
  const isSelectedAllTeamsChange = table.getToggleAllRowsSelectedHandler();
  const isSomeTeamsSelected = table.getIsSomeRowsSelected();

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeTeamsSelected;
    }
  }, [isSomeTeamsSelected]);

  return (
    <input
      ref={headerCheckboxRef}
      checked={isAllTeamsSelected}
      onChange={isSelectedAllTeamsChange}
      type="checkbox"
    />
  );
};

export const teamTableColumns = [
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
        href={ROUTE.HOME.team.detail.path(row.original.id)}
      >
        {getValue()}
      </Link>
    ),
  }),
  col.accessor("coach", {
    header: "Coach",
    cell: ({ getValue }) => {
      const val = getValue();
      return val?.name || "null";
    },
  }),
  col.accessor("center", {
    header: "Center",
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
    cell: function Action({ row }) {
      const centerId = row.original.id;
      const utils = api.useUtils();
      const { mutate: doDelete, isPending: isDeleting } =
        api.team.delete.useMutation({
          onSuccess() {
            toast.success(`Team ${row.original.name} deleted`);
            utils.center.list.invalidate();
          },
        });
      return (
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={ROUTE.HOME.team.edit.path(centerId)}>
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
