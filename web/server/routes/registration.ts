import { authedProcedure, router } from "../trpc";
import { ky } from "@/protocol";
import { paginationSchema } from "@/lib/schemas/params";
import { ApiList } from "@/lib/types";

import { z } from "zod";
import {
  Registration,
  registrationCreateSchema,
  registrationSchema,
  registrationUpdateSchema,
  updateStatusRegistrationSchema,
} from "@/lib/schemas/registration";

const paginationSessionSchema = paginationSchema.extend({
  session_id: z.string(),
});

export const registrationRouter = router({
  list: authedProcedure
    .input(paginationSchema.extend({ status: z.string().optional() }))
    .query(async ({ input }) => {
      const { page_size: page_size, page: page, query } = input;
      return ky.get<ApiList<Registration, "registrations">>({
        url: "/registration",
        params: { page_size, page, query },
      });
    }),
  list_by_session: authedProcedure
    .input(paginationSessionSchema)
    .query(async ({ input }) => {
      const {
        page_size: page_size,
        page: page,
        query,
        session_id: session_id,
      } = input;
      return ky.get<ApiList<Registration, "registrations">>({
        url: `/registration/session/${session_id}`,
        params: { page_size, page, query },
      });
    }),
  detail: authedProcedure
    .input(registrationSchema.pick({ id: true }))
    .query(async ({ input }) =>
      ky.get<Registration>(`/registration/${input.id}`)
    ),
  create: authedProcedure
    .input(registrationCreateSchema)
    .mutation(async ({ input }) =>
      ky.post<Registration>("/registration", input)
    ),
  delete: authedProcedure
    .input(z.object({ ids: registrationSchema.shape.id.array() }))
    .mutation(async ({ input }) =>
      ky.delete({ url: "/registration", params: { ids: input.ids } })
    ),
  update: authedProcedure
    .input(registrationUpdateSchema)
    .mutation(async ({ input }) =>
      ky.put<Registration>(`/registration/${input.id}`, input)
    ),
  update_status: authedProcedure
    .input(updateStatusRegistrationSchema)
    .mutation(async ({ input }) =>
      ky.put<Registration>(`/registration/${input.id}`, input)
    ),
});
