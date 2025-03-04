"use client";

import { useAtom } from "jotai";
import { stateExampleNameAtom } from "./store";
import { Input } from "@/components/ui/input";

let render = 0;

export function StateName() {
  const [name, setName] = useAtom(stateExampleNameAtom);

  return (
    <div className="flex flex-col gap-1">
      Renders: {render++}
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
    </div>
  );
}
