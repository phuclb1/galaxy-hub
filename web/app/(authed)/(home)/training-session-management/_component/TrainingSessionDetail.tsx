"use client";

import { useState, useMemo } from "react";
import { usePagination } from "@/lib/params";
import { useAtomValue } from "jotai";
import { format } from "date-fns";
import { studentApprovedColumns } from "./StudentApprovedColumn";
import { api } from "@/protocol/trpc/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/table/DataTable";
import { DataTablePagination } from "@/components/shared/table/DataTablePagination";
import Link from "next/link";
import { ROUTE } from "@/lib/constants";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TableSearchAtom } from "@/components/shared/table/TableFilter";
import { useTable } from "@/components/shared/table/useTable";
import { TrainingSession } from "@/lib/schemas/trainingsession";

export function TrainingSessionDetail({
  session,
  className,
  ...props
}: {
  session: TrainingSession;
} & React.ComponentPropsWithRef<"div">) {
  const [pagination, setPagination] = usePagination();
  const query = useAtomValue(TableSearchAtom);
  const { data: queryData } = api.registration.list.useQuery({
    ...pagination,
    query,
  });

  const data = useMemo(
    () =>
      queryData?.registrations?.filter(
        (fil) => fil.status === "Approved" && fil.session.id === session.id
      ) ?? [],
    [queryData]
  );

  const [attendanceUpdates, setAttendanceUpdates] = useState<
    Record<string, "Present" | "Late" | "Absent">
  >({});

  const { mutateAsync: createMultipleAttendance } =
    api.attendance.createMultiple.useMutation();

  const handleAttendanceChange = (
    userId: string,
    status: "Present" | "Late" | "Absent"
  ) => {
    setAttendanceUpdates((prev) => ({
      ...prev,
      [userId]: status,
    }));
  };

  const submitAttendanceUpdates = async () => {
    try {
      if (Object.keys(attendanceUpdates).length > 0) {
        const attendanceData = Object.keys(attendanceUpdates).map((userId) => ({
          status: attendanceUpdates[userId],
          session_id: session.id,
          user_id: userId,
        }));
        await createMultipleAttendance(attendanceData);
        toast.success("Attendance updated successfully!");
        setAttendanceUpdates({});
      } else {
        toast.error("No attendance updates to submit.");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Failed to update attendance.");
    }
  };

  const { table } = useTable({
    data,
    columns: studentApprovedColumns(handleAttendanceChange, attendanceUpdates), // Truyền vào hàm xử lý và trạng thái attendance
    pagination: { pagination, setPagination },
    total: queryData?.total,
  });

  const isAllSelected = useMemo(
    () =>
      data.every(
        (student) => attendanceUpdates[student.student.user_id] !== undefined
      ),
    [attendanceUpdates, data]
  );

  return (
    <div className="flex flex-col gap-2">
      <Card className={className} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Training Session Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {session.name}</div>
              <div>
                Start date: {format(new Date(session.start_date), "dd-MM-yyyy")}
              </div>
              <div>Training Session Type: {session.session_type}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row mt-5">
        <div className="font-semibold">Training Session Students</div>
        <Link
          className="ml-auto"
          href={ROUTE.HOME.trainingsession.attendance.path(session.id)}
        >
          <Button>List Attendance</Button>
        </Link>
      </div>
      <DataTable table={table} />
      <div className="flex">
        <DataTablePagination className="flex-1" table={table} />
      </div>

      <Button
        disabled={!isAllSelected}
        onClick={submitAttendanceUpdates}
        className="mt-4 w-fit"
      >
        Submit Attendance
      </Button>
    </div>
  );
}
