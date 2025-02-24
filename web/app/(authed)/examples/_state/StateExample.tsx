import { Code } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StateMaster } from "./StateMaster";
import { StateName } from "./StateName";
import { StateAge } from "./StateAge";
import { ExternalLink } from "lucide-react";

export function StateExample() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        Use the{" "}
        <a
          className="inline-flex items-center hover:underline"
          href="https://jotai.org/"
          target="_blank"
        >
          <Code>jotai</Code>
          <ExternalLink className="h-4 w-4" />
        </a>{" "}
        state library to manage global states and split complex data structure
        into smaller atoms to avoid extra re-renders
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Client (master data)</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <StateMaster />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Child Component 1 (name)</CardTitle>
            <CardDescription>
              Changing this won&apos;t rerender the age component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StateName />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Child Component 2 (age)</CardTitle>
            <CardDescription>
              Changing this won&apos;t rerender the name component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StateAge />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
