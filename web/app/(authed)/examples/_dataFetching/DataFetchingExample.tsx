import { Code, CodeBlock } from "@/components/ui/typography";
import { DataFetchingClient } from "./DataFetchingClient";
import { DataFetchingServer } from "./DataFetchingServer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";
import { PublicDataClient } from "./PublicDataClient";
import { PublicDataServer } from "./PublicDataServer";

const createRouterCode = `
import { authedProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
  greet: publicProcedure.mutation(async () => {
    return "hello world";
  }),
  getSomeData: authedProcedure.query(async () => {
    return ky.get("/auth/me")
  })
)}`;

export async function DataFetchingExample() {
  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Routers and procedures</CardTitle>
        </CardHeader>
        <CardContent>
          We retrieve data from so-called &quot;routers&quot;, and the
          permission scope of the data is called &quot;procedures&quot; (e.g.
          only signed users can retrieve data from <Code>authedProcedure</Code>{" "}
          and unsigned user can only retrieve data from{" "}
          <Code>publicProcedure</Code>)
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Creating a new route</CardTitle>
          <CardDescription>
            You can read on more on{" "}
            <a
              className="inline-block underline"
              href="https://trpc.io/docs/quickstart#2-add-a-query-procedure"
              target="_blank"
            >
              adding a query
            </a>{" "}
            and{" "}
            <a
              className="underline"
              href="https://trpc.io/docs/quickstart#4-adding-a-mutation-procedure"
              target="_blank"
            >
              adding a mutation
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Code>server/index.ts</Code>
          <CodeBlock>{createRouterCode}</CodeBlock>
          You can then use these routers in both client-side and server-side
          context
        </CardContent>
      </Card>
      {env.DEBUG_SKIP_AUTH ? (
        <div className="grid grid-cols-2 gap-2">
          <PublicDataClient />
          <PublicDataServer />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <DataFetchingClient />
          <DataFetchingServer />
        </div>
      )}
    </div>
  );
}
