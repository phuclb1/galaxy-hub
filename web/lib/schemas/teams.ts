import { z } from "zod";
import { userSchema } from "./user";
import { trainingCenterSchema } from "./training-center";

export const teamSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name must be required" }),
  coach_id: z.string(),
  center_id: z.string(),
  coach: userSchema,
  center: trainingCenterSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export type Team = z.TypeOf<typeof teamSchema>;

export const teamCreateSchema = teamSchema.pick({
  name: true,
  coach_id: true,
  center_id: true,
});

export type TeamCreate = z.TypeOf<typeof teamCreateSchema>;

export const teamUpdateSchema = teamSchema.pick({
  id: true,
  name: true,
  coach_id: true,
  center_id: true,
});

export type TeamUpdate = z.TypeOf<typeof teamUpdateSchema>;
