import { z } from "zod";
import { trainingSessionSchema } from "./trainingsession";
import { studentSchema } from "./students";

export const registrationStatusEnum = z.enum([
  "Pending",
  "Approved",
  "Rejected",
]);

export type RegistrationStatus = z.TypeOf<typeof registrationStatusEnum>;

export const registrationSchema = z.object({
  id: z.string(),
  student_id: z.string(),
  session_id: z.string(),
  status: registrationStatusEnum,
  student: studentSchema,
  session: trainingSessionSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export type Registration = z.TypeOf<typeof registrationSchema>;

export const registrationCreateSchema = registrationSchema.pick({
  student_id: true,
  session_id: true,
  // status: true,
});

export type RegistrationCreate = z.TypeOf<typeof registrationCreateSchema>;

export const registrationUpdateSchema = registrationSchema.pick({
  id: true,
  student_id: true,
  session_id: true,
  // status: true,
});

export type RegistrationUpdate = z.TypeOf<typeof registrationUpdateSchema>;

export const updateStatusRegistrationSchema = registrationSchema.pick({
  id: true,
  status: true,
});

export type UpdateStatusRegistration = z.TypeOf<
  typeof updateStatusRegistrationSchema
>;
