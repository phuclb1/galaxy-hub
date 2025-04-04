"use client";

import { ROUTE } from "@/lib/constants";
import {
  TrainingSessionCreate,
  trainingSessionCreateSchema,
  TrainingSessionUpdate,
  trainingSessionUpdateSchema,
} from "@/lib/schemas/trainingsession";
import { FormContextReturn, FormProviderProps } from "@/lib/types";
import { api } from "@/protocol/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, use, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TrainingSessionFormContext = createContext<
  FormContextReturn<TrainingSessionCreate | TrainingSessionUpdate> | undefined
>(undefined);

const defaultTrainingSession: TrainingSessionCreate = {
  name: "",
  coach_id: "",
  team_id: "",
  start_date: 0,
  session_type: "Training",
};

export function TrainingSessionFormProvider({
  children,
  mode,
  defaultValues,
}: Readonly<FormProviderProps<TrainingSessionCreate | TrainingSessionUpdate>>) {
  const validator =
    mode === "CREATE"
      ? trainingSessionCreateSchema
      : trainingSessionUpdateSchema;
  const form = useForm<TrainingSessionCreate | TrainingSessionUpdate>({
    resolver: zodResolver(validator),
    defaultValues: defaultValues ?? defaultTrainingSession,
  });
  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync: createTrainingSession, isPending: isCreating } =
    api.training_session.create.useMutation({
      onSuccess() {
        toast.success("Created successfully");
        router.push(ROUTE.HOME.trainingsession.root.path);
        utils.training_session.list.invalidate();
      },
    });
  const { mutateAsync: updateTrainingSession, isPending: isUpdating } =
    api.training_session.update.useMutation({
      onSuccess(_a, vars) {
        toast.success("Updated successfully");
        router.push(ROUTE.HOME.trainingsession.root.path);
        utils.training_session.list.invalidate();
        utils.training_session.detail.invalidate({ id: vars.id });
      },
    });

  const onSubmit = useCallback(
    async (values: TrainingSessionCreate | TrainingSessionUpdate) => {
      switch (mode) {
        case "CREATE":
          await createTrainingSession(values as TrainingSessionCreate);
          break;
        case "EDIT":
          await updateTrainingSession(values as TrainingSessionUpdate);
          break;
        default:
          break;
      }
    },
    [createTrainingSession, mode, updateTrainingSession]
  );

  return (
    <TrainingSessionFormContext.Provider
      value={{
        form,
        defaultValues,
        mode,
        onSubmit: form.handleSubmit(onSubmit),
        isPending: isCreating || isUpdating,
      }}
    >
      {children}
    </TrainingSessionFormContext.Provider>
  );
}

export function useTrainingSessionForm() {
  const ctx = use(TrainingSessionFormContext);
  if (!ctx) throw new Error("Hook used outside Provider!");
  return ctx;
}
