import { ConfirmPopover } from "@/components/shared/ConfirmPopover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Attendance } from "@/lib/schemas/attendance";
import { api } from "@/protocol/trpc/client";
import { createColumnHelper } from "@tanstack/react-table";
import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react";
import { toast } from "sonner";

const col = createColumnHelper<Attendance>();

export const attendanceTableColumns = [
  col.accessor("user", {
    header: "Name",
    cell: ({ getValue }) => {
      const val = getValue();
      return val?.name || "null";
    },
  }),
  col.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
  }),
  col.display({
    id: "action",
    size: 150,
    cell: function Action({ row }) {
      const attendanceId = row.original.id;
      const userId = row.original.user_id;
      const sessionId = row.original.session_id;
      const utils = api.useUtils();
      const { mutate: updateStatus, isPending: isUpdating } =
        api.attendance.update.useMutation({
          onSuccess() {
            toast.success("Update successfully");
            utils.attendance.list_by_session.invalidate();
          },
        });

      return (
        <div className="flex justify-end">
          <Tooltip>
            <ConfirmPopover
              asChild
              onConfirm={() =>
                updateStatus({
                  id: attendanceId,
                  user_id: userId,
                  session_id: sessionId,
                  status: "Present",
                })
              }
              variant="default"
            >
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  disabled={isUpdating || row.original.status === "Present"}
                  variant="ghost"
                >
                  <CircleCheckBig className="text-green-800" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Present</TooltipContent>
          </Tooltip>
          <Tooltip>
            <ConfirmPopover
              asChild
              onConfirm={() =>
                updateStatus({
                  id: attendanceId,
                  user_id: userId,
                  session_id: sessionId,
                  status: "Late",
                })
              }
              variant="default"
            >
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  disabled={isUpdating || row.original.status === "Late"}
                  variant="ghost"
                >
                  <CircleAlert className="text-yellow-400" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Late</TooltipContent>
          </Tooltip>
          <Tooltip>
            <ConfirmPopover
              asChild
              onConfirm={() =>
                updateStatus({
                  id: attendanceId,
                  user_id: userId,
                  session_id: sessionId,
                  status: "Absent",
                })
              }
              variant="default"
            >
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  disabled={isUpdating || row.original.status === "Absent"}
                  variant="ghost"
                >
                  <CircleX className="text-destructive" />
                </Button>
              </TooltipTrigger>
            </ConfirmPopover>
            <TooltipContent>Absent</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  }),
];
