"use client";

import { useAtom } from "jotai";
import { stateExampleAgeAtom } from "./store";
import { Input } from "@/components/ui/input";

let render = 0;

export function StateAge() {
  const [age, setAge] = useAtom(stateExampleAgeAtom);

  return (
    <div className="flex flex-col gap-1">
      Renders: {render++}
      <Input
        onChange={(e) => {
          const next = isNaN(e.target.valueAsNumber)
            ? 0
            : e.target.valueAsNumber;
          if (age !== next) setAge(next);
        }}
        type="number"
        value={age}
      />
    </div>
  );
}
