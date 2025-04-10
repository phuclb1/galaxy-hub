"use client";

import { ROUTE } from "@/lib/constants";
import {
  FeedbackCreate,
  feedbackCreateSchema,
  FeedbackUpdate,
  feedbackUpdateSchema,
} from "@/lib/schemas/feedback";
import { FormContextReturn, FormProviderProps } from "@/lib/types";
import { api } from "@/protocol/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, use, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const FeedbackFormContext = createContext<
  FormContextReturn<FeedbackCreate | FeedbackUpdate> | undefined
>(undefined);

export function FeedbackFormProvider({
  children,
  mode,
  defaultValues,
  user,
  session,
}: Readonly<FormProviderProps<FeedbackCreate | FeedbackUpdate>>) {
  const defaultFeedback: FeedbackCreate = {
    user_id: user?.id ?? "",
    session_id: session?.id ?? "",
    context: "",
  };
  const validator =
    mode === "CREATE" ? feedbackCreateSchema : feedbackUpdateSchema;
  const form = useForm<FeedbackCreate | FeedbackUpdate>({
    resolver: zodResolver(validator),
    defaultValues: defaultValues ?? defaultFeedback,
  });
  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync: createFeedback, isPending: isCreating } =
    api.feedback.create.useMutation({
      onSuccess() {
        toast.success("Created successfully");
      },
    });
  const { mutateAsync: updateFeedback, isPending: isUpdating } =
    api.feedback.update.useMutation({
      onSuccess(_a, vars) {
        toast.success("Updated successfully");
        router.push(ROUTE.HOME.trainingsession.root.path);
        utils.training_session.list.invalidate();
        utils.training_session.detail.invalidate({ id: vars.id });
      },
    });

  const onSubmit = useCallback(
    async (values: FeedbackCreate | FeedbackUpdate) => {
      switch (mode) {
        case "CREATE":
          await createFeedback(values as FeedbackCreate);
          break;
        case "EDIT":
          await updateFeedback(values as FeedbackUpdate);
          break;
        default:
          break;
      }
    },
    [createFeedback, mode, updateFeedback]
  );

  return (
    <FeedbackFormContext.Provider
      value={{
        form,
        defaultValues,
        mode,
        onSubmit: form.handleSubmit(onSubmit),
        isPending: isCreating || isUpdating,
        user,
        session,
      }}
    >
      {children}
    </FeedbackFormContext.Provider>
  );
}

export function useFeedbackForm() {
  const ctx = use(FeedbackFormContext);
  if (!ctx) throw new Error("Hook used outside Provider!");
  return ctx;
}
