import { authedProcedure, router } from "../trpc";
import { ky } from "@/protocol";
import { paginationSchema } from "@/lib/schemas/params";
import { ApiList } from "@/lib/types";
import { z } from "zod";
import {
  Team,
  teamCreateSchema,
  teamSchema,
  teamUpdateSchema,
} from "@/lib/schemas/teams";

export const teamRouter = router({
  list: authedProcedure.input(paginationSchema).query(async ({ input }) => {
    const { page_size: page_size, page: page, query } = input;
    return ky.get<ApiList<Team, "teams">>({
      url: "/teams",
      params: { page_size, page, query },
    });
  }),
  detail: authedProcedure
    .input(teamSchema.pick({ id: true }))
    .query(async ({ input }) => ky.get<Team>(`/teams/${input.id}`)),
  create: authedProcedure
    .input(teamCreateSchema)
    .mutation(async ({ input }) => ky.post<Team>("/teams", input)),
  delete: authedProcedure
    .input(z.object({ ids: teamSchema.shape.id.array() }))
    .mutation(async ({ input }) =>
      ky.delete({ url: "/teams", params: { ids: input.ids } })
    ),
  update: authedProcedure
    .input(teamUpdateSchema)
    .mutation(async ({ input }) => ky.put<Team>(`/teams/${input.id}`, input)),
});
