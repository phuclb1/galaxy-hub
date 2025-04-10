import { paginationSchema } from "@/lib/schemas/params";
import { authedProcedure, router } from "../trpc";
import { ApiList } from "@/lib/types";
import { ky } from "@/protocol";
import {
  Feedback,
  feedbackCreateSchema,
  feedbackSchema,
  feedbackUpdateSchema,
} from "@/lib/schemas/feedback";
import { z } from "zod";

export const feedbackRouter = router({
  list: authedProcedure.input(paginationSchema).query(async ({ input }) => {
    const { page_size: page_size, page: page, query } = input;
    return ky.get<ApiList<Feedback, "feedbacks">>({
      url: "/feedback",
      params: { page_size, page, query },
    });
  }),
  detail: authedProcedure
    .input(feedbackSchema.pick({ id: true }))
    .query(async ({ input }) => ky.get<Feedback>(`/feedback/${input.id}`)),
  create: authedProcedure
    .input(feedbackCreateSchema)
    .mutation(async ({ input }) => ky.post<Feedback>("/feedback", input)),
  delete: authedProcedure
    .input(z.object({ ids: feedbackSchema.shape.id.array() }))
    .mutation(async ({ input }) =>
      ky.delete({ url: "/feedback", params: { ids: input.ids } })
    ),
  update: authedProcedure
    .input(feedbackUpdateSchema)
    .mutation(async ({ input }) =>
      ky.put<Feedback>(`/feedback/${input.id}`, input)
    ),
});
