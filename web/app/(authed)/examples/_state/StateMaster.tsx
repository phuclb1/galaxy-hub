"use client";
import { useAtomValue } from "jotai";
import { stateExampleAtom } from "./store";
import { CodeBlock } from "@/components/ui/typography";

let render = 0;

export function StateMaster() {
  const value = useAtomValue(stateExampleAtom);

  return (
    <div className="flex flex-col gap-1">
      Renders: {render++}
      <CodeBlock>{JSON.stringify(value, null, 2)}</CodeBlock>
    </div>
  );
}
