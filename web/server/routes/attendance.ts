import { paginationSchema } from "@/lib/schemas/params";
import { authedProcedure, router } from "../trpc";
import { ky } from "@/protocol";
import { ApiList } from "@/lib/types";
import {
  Attendance,
  attendanceCreateSchema,
  attendanceSchema,
  attendanceUpdateSchema,
} from "@/lib/schemas/attendance";
import { z } from "zod";

const paginationAttendanceSchema = paginationSchema.extend({
  session_id: z.string(),
  filter_date: z.string().optional(),
});

export const attendanceRouter = router({
  list: authedProcedure.input(paginationSchema).query(async ({ input }) => {
    const { page_size: page_size, page: page, query } = input;
    return ky.get<ApiList<Attendance, "attendances">>({
      url: "/attendance",
      params: { page_size, page, query },
    });
  }),
  list_by_session: authedProcedure
    .input(paginationAttendanceSchema)
    .query(async ({ input }) => {
      const {
        page_size: page_size,
        page: page,
        query,
        session_id: session_id,
        filter_date: filter_date,
      } = input;
      return ky.get<ApiList<Attendance, "attendances">>({
        url: `/attendance/${session_id}/session`,
        params: { page_size, page, query, filter_date },
      });
    }),
  detail: authedProcedure
    .input(attendanceSchema.pick({ id: true }))
    .query(async ({ input }) => ky.get<Attendance>(`/attendance/${input.id}`)),
  create: authedProcedure
    .input(attendanceCreateSchema)
    .mutation(async ({ input }) => ky.post<Attendance>("/attendance", input)),
  createMultiple: authedProcedure
    .input(z.array(attendanceCreateSchema))
    .mutation(async ({ input }) => {
      return ky.post<Attendance[]>("/attendance/multiple", input);
    }),
  delete: authedProcedure
    .input(z.object({ ids: attendanceSchema.shape.id.array() }))
    .mutation(async ({ input }) =>
      ky.delete({ url: "/attendance", params: { ids: input.ids } })
    ),
  update: authedProcedure
    .input(attendanceUpdateSchema)
    .mutation(async ({ input }) =>
      ky.put<Attendance>(`/attendance/${input.id}`, input)
    ),
});
