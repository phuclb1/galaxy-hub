import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

export const stateExampleAtom = atom({
  name: "TVF User",
  age: 20,
});

export const stateExampleNameAtom = focusAtom(stateExampleAtom, (optic) =>
  optic.prop("name"),
);

export const stateExampleAgeAtom = focusAtom(stateExampleAtom, (optic) =>
  optic.prop("age"),
);
