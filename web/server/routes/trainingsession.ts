import { authedProcedure, router } from "../trpc";
import { ky } from "@/protocol";
import { paginationSchema } from "@/lib/schemas/params";
import { ApiList } from "@/lib/types";

import { z } from "zod";
import {
  TrainingSession,
  trainingSessionCreateSchema,
  trainingSessionSchema,
  trainingSessionUpdateSchema,
} from "@/lib/schemas/trainingsession";

export const trainingSessionRouter = router({
  list: authedProcedure.input(paginationSchema).query(async ({ input }) => {
    const { page_size: page_size, page: page, query } = input;
    return ky.get<ApiList<TrainingSession, "training_sessions">>({
      url: "/training-sessions",
      params: { page_size, page, query },
    });
  }),
  detail: authedProcedure
    .input(trainingSessionSchema.pick({ id: true }))
    .query(async ({ input }) =>
      ky.get<TrainingSession>(`/training-sessions/${input.id}`)
    ),
  create: authedProcedure
    .input(trainingSessionCreateSchema)
    .mutation(async ({ input }) =>
      ky.post<TrainingSession>("/training-sessions", input)
    ),
  delete: authedProcedure
    .input(z.object({ ids: trainingSessionSchema.shape.id.array() }))
    .mutation(async ({ input }) =>
      ky.delete({ url: "/training-sessions", params: { ids: input.ids } })
    ),
  update: authedProcedure
    .input(trainingSessionUpdateSchema)
    .mutation(async ({ input }) =>
      ky.put<TrainingSession>(`/training-sessions/${input.id}`, input)
    ),
});
