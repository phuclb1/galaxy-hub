import { AuthGuardClient } from "@/components/shared/AuthGuardClient";
import { ConfirmPopover } from "@/components/shared/ConfirmPopover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTE } from "@/lib/constants";
import { api } from "@/protocol/trpc/client";
import { createColumnHelper } from "@tanstack/react-table";
import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { toast } from "sonner";
import dayjs from "dayjs";

const col = createColumnHelper<User>();

export const tableColumns = [
  col.display({
    id: "select",
    header: ({ table }) => {
      const isAllUsersSelected = table.getIsAllRowsSelected();
      const isSelectedAllUsersChange = table.getToggleAllRowsSelectedHandler();
      return (
        <input
          checked={isAllUsersSelected}
          onChange={isSelectedAllUsersChange}
          type="checkbox"
        />
      );
    },
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
  }),
  col.accessor("email", { header: "Email" }),
  col.accessor("role", {
    header: "Role",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
  }),
  col.accessor("created_at", {
    header: "Created at",
    cell: ({ getValue }) => {
      const val = getValue();
      return val ? new Date(val).toLocaleString() : null;
    },
  }),
  col.accessor("updated_at", {
    header: "Updated at",
    cell: ({ getValue }) => {
      const val = getValue();
      return val ? new Date(val).toLocaleString() : null;
    },
  }),
  col.display({
    id: "action",
    cell: function Action({ row }) {
      const userId = row.original.id;
      const utils = api.useUtils();
      const { mutate: doDelete, isPending: isDeleting } =
        api.user.delete.useMutation({
          onSuccess() {
            toast.success(`User ${row.original.name} deleted`);
            utils.user.list.invalidate();
          },
        });

      return (
        <div className="flex justify-end">
          {/* <AuthGuardClient viewableFor={""}> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={""}>
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
              onConfirm={() => doDelete({ ids: [userId] })}
            >
              <TooltipTrigger asChild>
                <Button disabled={isDeleting} size="icon" variant="ghost">
                  <Trash2 className="text-destructive" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
          {/* </AuthGuardClient> */}
        </div>
      );
    },
  }),
];
