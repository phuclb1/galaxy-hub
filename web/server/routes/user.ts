import { z } from "zod";
import { authedProcedure, publicProcedure, router } from "../trpc";
import { ky } from "@/protocol";
import { paginationSchema } from "@/lib/schemas/params";
import { url } from "@/protocol/ky";
import { UserList, userFormSchema, User } from "@/types/user";

export const userRouter = router({
  list: authedProcedure
    .input(
      paginationSchema.extend({
        query: z.string().optional(),
      }),
    )
    .query(async ({ input: params }) => {
      console.log(params)
      const res = await ky.get<UserList>(url("/users", params));
      return res;
    }),
  create: publicProcedure
    .input(userFormSchema)
    .mutation(async ({ input: user }) => {
      const res = await ky.post<User, User>("/users", user);
      return res;
    }
    ),
  update: authedProcedure
    .input(z.object({ id: z.string(), body: userFormSchema }))
    .mutation(async ({ input: { id, body } }) => {
      const res = await ky.put<User, User>(`/users/${id}`, body);
      return res;
    }),
  delete: authedProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      const res = await ky.delete<null>(url("/users", { ids: [id] }));
      console.log("RES", res)
      return res;
    }),
});
