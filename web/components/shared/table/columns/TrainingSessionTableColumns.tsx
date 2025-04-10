import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/lib/constants";
import { TrainingSession } from "@/lib/schemas/trainingsession";
import { api } from "@/protocol/trpc/client";
import { createColumnHelper, Table } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ConfirmPopover } from "../../ConfirmPopover";
import formatDate from "../../FormatDate";

const col = createColumnHelper<TrainingSession>();

const HeaderCheckbox = ({ table }: { table: Table<TrainingSession> }) => {
  const isAllSessionsSelected = table.getIsAllRowsSelected();
  const isSelectedAllSessionsChange = table.getToggleAllRowsSelectedHandler();
  const isSomeSessionsSelected = table.getIsSomeRowsSelected();

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeSessionsSelected;
    }
  }, [isSomeSessionsSelected]);

  return (
    <input
      ref={headerCheckboxRef}
      checked={isAllSessionsSelected}
      onChange={isSelectedAllSessionsChange}
      type="checkbox"
    />
  );
};

export const trainingSessionTableColumns = [
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
        href={ROUTE.HOME.trainingsession.detail.path(row.original.id)}
      >
        {getValue()}
      </Link>
    ),
  }),
  col.accessor("session_type", {
    header: "Session Type",
  }),
  col.accessor("coach", {
    header: "Coach",
    cell: ({ getValue }) => {
      const val = getValue();
      return val?.name || "null";
    },
  }),
  col.accessor("team", {
    header: "Team",
    cell: ({ getValue }) => {
      const val = getValue();
      return val?.name || "null";
    },
  }),
  col.accessor("start_date", {
    header: "Start date",
    cell: ({ getValue }) => {
      const val = getValue();
      return formatDate(val);
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
      const trainingSessionId = row.original.id;
      const utils = api.useUtils();
      const { mutate: doDelete, isPending: isDeleting } =
        api.training_session.delete.useMutation({
          onSuccess() {
            toast.success(`Training session ${trainingSessionId} deleted`);
            utils.training_session.list.invalidate();
          },
        });
      return (
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={ROUTE.HOME.trainingsession.edit.path(trainingSessionId)}
              >
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
              onConfirm={() => doDelete({ ids: [trainingSessionId] })}
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
