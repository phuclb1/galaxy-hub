import { authedProcedure, publicProcedure, router } from "./trpc";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { exampleRouter } from "./routes/example";
import { centerRouter } from "./routes/center";
import { teamRouter } from "./routes/teams";
import { studentRouter } from "./routes/students";

export const appRouter = router({
  auth: authRouter,
  example: {
    greeting: publicProcedure.query(async () => ({ hello: "world" })),
    protected: authedProcedure.query(async () => "this is a protected string"),
  },
  test: exampleRouter,
  center: centerRouter,
  user: userRouter,
  team: teamRouter,
  student: studentRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
