import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { ROUTE } from "@/lib/constants";
import { Registration } from "@/lib/schemas/registration";

export const studentApprovedColumns = (
  handleAttendanceChange: (
    userId: string,
    status: "Present" | "Late" | "Absent"
  ) => void,
  attendanceState: Record<string, "Present" | "Late" | "Absent">
) => {
  const col = createColumnHelper<Registration>();

  return [
    col.accessor("student", {
      header: "Name",
      cell: ({ getValue, row }) => {
        const val = getValue();
        return (
          <Link
            className="underline hover:no-underline"
            href={ROUTE.HOME.student.detail.path(row.original.student.id)}
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

    col.display({
      id: "attendance_status",
      size: 250,
      header: "Attendance",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name={`attendance-${row.original.student.user_id}`}
              value="Present"
              checked={
                attendanceState[row.original.student.user_id] === "Present"
              }
              onChange={() =>
                handleAttendanceChange(row.original.student.user_id, "Present")
              }
            />
            Present
          </label>

          <label>
            <input
              type="radio"
              name={`attendance-${row.original.student.user_id}`}
              value="Late"
              checked={attendanceState[row.original.student.user_id] === "Late"}
              onChange={() =>
                handleAttendanceChange(row.original.student.user_id, "Late")
              }
            />
            Late
          </label>

          <label>
            <input
              type="radio"
              name={`attendance-${row.original.student.user_id}`}
              value="Absent"
              checked={
                attendanceState[row.original.student.user_id] === "Absent"
              }
              onChange={() =>
                handleAttendanceChange(row.original.student.user_id, "Absent")
              }
            />
            Absent
          </label>
        </div>
      ),
    }),
  ];
};
