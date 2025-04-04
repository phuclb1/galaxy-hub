import { z } from "zod";
import { userSchema } from "./user";
import { teamSchema } from "./teams";

export const sessionTypeEnum = z.enum(["Training", "Match", "Evaluation"]);

export type SessionType = z.TypeOf<typeof sessionTypeEnum>;

export const trainingSessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  coach_id: z.string(),
  team_id: z.string(),
  start_date: z.number(),
  session_type: sessionTypeEnum,
  coach: userSchema,
  team: teamSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export type TrainingSession = z.TypeOf<typeof trainingSessionSchema>;

export const trainingSessionCreateSchema = trainingSessionSchema.pick({
  name: true,
  coach_id: true,
  team_id: true,
  start_date: true,
  session_type: true,
});

export type TrainingSessionCreate = z.TypeOf<
  typeof trainingSessionCreateSchema
>;

export const trainingSessionUpdateSchema = trainingSessionSchema.pick({
  id: true,
  name: true,
  coach_id: true,
  team_id: true,
  start_date: true,
  session_type: true,
});

export type TrainingSessionUpdate = z.TypeOf<
  typeof trainingSessionUpdateSchema
>;
