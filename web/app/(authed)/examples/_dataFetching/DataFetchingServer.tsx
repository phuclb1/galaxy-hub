import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, CodeBlock } from "@/components/ui/typography";
import { api } from "@/protocol/trpc/server";

export async function DataFetchingServer() {
  const data = await api.auth.me();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server</CardTitle>
        <CardDescription>
          Server-side usage. Get the data directly using{" "}
          <Code>await api.your.router.path()</Code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
      </CardContent>
    </Card>
  );
}
