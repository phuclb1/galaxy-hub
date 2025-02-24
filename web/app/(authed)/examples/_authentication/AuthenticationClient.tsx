"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, CodeBlock } from "@/components/ui/typography";
import { useSession } from "next-auth/react";

export function AuthenticationClient() {
  const sess = useSession();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client</CardTitle>
        <CardDescription>
          Client-side usage using <Code>useSession()</Code>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CodeBlock>{JSON.stringify(sess, null, 2)}</CodeBlock>
      </CardContent>
    </Card>
  );
}
