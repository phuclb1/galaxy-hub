import { z } from "zod";
import { userSchema } from "./user";
import { trainingSessionSchema } from "./trainingsession";

export const feedbackSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  session_id: z.string(),
  context: z.string(),
  user: userSchema,
  session: trainingSessionSchema,
  created_at: z.number(),
  updated_at: z.number(),
});

export type Feedback = z.TypeOf<typeof feedbackSchema>;

export const feedbackCreateSchema = feedbackSchema.pick({
  user_id: true,
  session_id: true,
  context: true,
});

export type FeedbackCreate = z.TypeOf<typeof feedbackCreateSchema>;

export const feedbackUpdateSchema = feedbackSchema.pick({
  id: true,
  user_id: true,
  session_id: true,
  context: true,
});

export type FeedbackUpdate = z.TypeOf<typeof feedbackUpdateSchema>;
