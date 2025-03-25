import { z } from "zod";
import { userSchema } from "./user";
import { teamSchema } from "./teams";

export const studentSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  team_id: z.string(),
  parent_id: z.string(),
  user: userSchema,
  team: teamSchema,
  parent: userSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export type Student = z.TypeOf<typeof studentSchema>;

export const studentCreateSchema = studentSchema.pick({
  user_id: true,
  team_id: true,
  parent_id: true,
});

export type StudentCreate = z.TypeOf<typeof studentCreateSchema>;

export const studentUpdateSchema = studentSchema.pick({
  id: true,
  user_id: true,
  team_id: true,
  parent_id: true,
});

export type StudentUpdate = z.TypeOf<typeof studentUpdateSchema>;
