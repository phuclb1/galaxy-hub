import { z } from "zod";

export const userRoleEnum = z.enum([
  "BLD",
  "Director",
  "Coach",
  "Manager",
  "Athlete",
  "Student",
  "Parent",
]);
export type UserRole = z.TypeOf<typeof userRoleEnum>;

const baseUserSchema = z.object({
  name: z.string().min(1, { message: "Name must be required" }),
  email: z.string().email(),
  role: userRoleEnum,
  id: z.string(),
  hashed_token: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
});
export const userSchema = baseUserSchema.extend({
  creator: baseUserSchema,
});

export const userCreateSchema = userSchema
  .pick({
    name: true,
    email: true,
    role: true,
  })
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });
export type UserCreate = z.TypeOf<typeof userCreateSchema>;

export const userUpdateSchema = userSchema
  .pick({
    id: true,
    name: true,
    role: true,
  })
  .extend({
    password: z.string(),
  })
  .partial();
export type UserUpdate = z.TypeOf<typeof userUpdateSchema>;
