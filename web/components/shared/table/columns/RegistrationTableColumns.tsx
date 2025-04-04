import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/lib/constants";
import { Registration } from "@/lib/schemas/registration";
import { api } from "@/protocol/trpc/client";
import { createColumnHelper, Table } from "@tanstack/react-table";
import { CircleCheckBig, CircleX, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ConfirmPopover } from "../../ConfirmPopover";
import formatDate from "../../FormatDate";

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

export const registrationTableColumns = [
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
      const registrationId = row.original.id;
      const utils = api.useUtils();
      const { mutate: doDelete, isPending: isDeleting } =
        api.registration.delete.useMutation({
          onSuccess() {
            toast.success(`Registration ${registrationId} deleted`);
            utils.registration.list.invalidate();
          },
        });
      const { mutate: updateStatus, isPending: isUpdating } =
        api.registration.update_status.useMutation({
          onSuccess() {
            toast.success("Update status successfully");
            utils.registration.list.invalidate();
          },
        });
      return (
        <div className="flex justify-end">
          <Tooltip>
            <ConfirmPopover
              asChild
              onConfirm={() =>
                updateStatus({ id: registrationId, status: "Approved" })
              }
              variant="default"
            >
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" disabled={isUpdating}>
                  <CircleCheckBig className="text-green-800" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Approved</TooltipContent>
          </Tooltip>
          <Tooltip>
            <ConfirmPopover
              asChild
              onConfirm={() =>
                updateStatus({ id: registrationId, status: "Rejected" })
              }
              variant="default"
            >
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" disabled={isUpdating}>
                  <CircleX className="text-destructive" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Rejected</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={ROUTE.HOME.registration.edit.path(registrationId)}>
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
              onConfirm={() => doDelete({ ids: [registrationId] })}
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
