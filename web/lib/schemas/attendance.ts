import { z } from "zod";
import { userSchema } from "./user";
import { trainingSessionSchema } from "./trainingsession";

export const attendanceStatusEnum = z.enum(["Present", "Absent", "Late"]);

export type AttendanceStatus = z.TypeOf<typeof attendanceStatusEnum>;

export const attendanceSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  session_id: z.string(),
  status: attendanceStatusEnum,
  user: userSchema,
  session: trainingSessionSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export type Attendance = z.TypeOf<typeof attendanceSchema>;

export const attendanceCreateSchema = attendanceSchema.pick({
  user_id: true,
  session_id: true,
  status: true,
});

export type AttendanceCreate = z.TypeOf<typeof attendanceCreateSchema>;

export const attendanceUpdateSchema = attendanceSchema.pick({
  id: true,
  user_id: true,
  session_id: true,
  status: true,
});

export type AttendanceUpdate = z.TypeOf<typeof attendanceUpdateSchema>;
