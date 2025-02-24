import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, CodeBlock } from "@/components/ui/typography";
import { getSession } from "@/server/actions/session";

export async function AuthenticationServer() {
  const session = await getSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server</CardTitle>
        <CardDescription>
          Server-side usage using
          <Code>getSession()</Code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock>{JSON.stringify(session, null, 2)}</CodeBlock>
      </CardContent>
    </Card>
  );
}
