import { paginationSchema } from "@/lib/schemas/params";
import { authedProcedure, router } from "../trpc";
import { ky } from "@/protocol";
import { ApiList } from "@/lib/types";
import {
  Student,
  studentCreateSchema,
  studentSchema,
  studentUpdateSchema,
} from "@/lib/schemas/students";
import { z } from "zod";

export const studentRouter = router({
  list: authedProcedure.input(paginationSchema).query(async ({ input }) => {
    const { page_size: page_size, page: page, query } = input;
    return ky.get<ApiList<Student, "students">>({
      url: "/students",
      params: { page_size, page, query },
    });
  }),
  detail: authedProcedure
    .input(studentSchema.pick({ id: true }))
    .query(async ({ input }) => ky.get<Student>(`/students/${input.id}`)),
  create: authedProcedure
    .input(studentCreateSchema)
    .mutation(async ({ input }) => ky.post<Student>("/students", input)),
  delete: authedProcedure
    .input(z.object({ ids: studentSchema.shape.id.array() }))
    .mutation(async ({ input }) =>
      ky.delete({ url: "/students", params: { ids: input.ids } })
    ),
  update: authedProcedure
    .input(studentUpdateSchema)
    .mutation(async ({ input }) =>
      ky.put<Student>(`/students/${input.id}`, input)
    ),
});
