import { z } from "zod";

export const centerTypeEnum = z.enum(["Football", "Basketball"]);
export type CenterType = z.TypeOf<typeof centerTypeEnum>;

export const centerDepartmentEnum = z.enum(["Affiliated", "Cooperate"]);
export type CenterDepartment = z.TypeOf<typeof centerDepartmentEnum>;

export const trainingCenterSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  type: z.string(),
  department: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
});

export type TrainingCenter = z.TypeOf<typeof trainingCenterSchema>;

export const centerCreateSchema = trainingCenterSchema.pick({
  name: true,
  address: true,
  type: true,
  department: true,
});

export type CenterCreate = z.TypeOf<typeof centerCreateSchema>;

export const centerUpdateSchema = trainingCenterSchema.pick({
  id: true,
  name: true,
  address: true,
  type: true,
  department: true,
});

export type CenterUpdate = z.TypeOf<typeof centerUpdateSchema>;
