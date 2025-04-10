import { authedProcedure, publicProcedure, router } from "./trpc";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { exampleRouter } from "./routes/example";
import { centerRouter } from "./routes/center";
import { teamRouter } from "./routes/teams";
import { studentRouter } from "./routes/students";
import { trainingSessionRouter } from "./routes/trainingsession";
import { registrationRouter } from "./routes/registration";
import { feedbackRouter } from "./routes/feedback";
import { attendanceRouter } from "./routes/attendance";

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
  training_session: trainingSessionRouter,
  registration: registrationRouter,
  feedback: feedbackRouter,
  attendance: attendanceRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
