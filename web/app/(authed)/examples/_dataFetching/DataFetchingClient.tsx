"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, CodeBlock } from "@/components/ui/typography";
import { api } from "@/protocol/trpc/client";

export function DataFetchingClient() {
  const { data } = api.auth.me.useQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client</CardTitle>
        <CardDescription>
          Client-side usage. Use <Code>api.your.router.path.useQuery()</Code>{" "}
          like normal react query calls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
      </CardContent>
    </Card>
  );
}
