"use client";

import { ROUTE } from "@/lib/constants";
import {
  RegistrationCreate,
  registrationCreateSchema,
  RegistrationUpdate,
  registrationUpdateSchema,
} from "@/lib/schemas/registration";
import { FormContextReturn, FormProviderProps } from "@/lib/types";
import { api } from "@/protocol/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, use, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegistrationFormContext = createContext<
  FormContextReturn<RegistrationCreate | RegistrationUpdate> | undefined
>(undefined);

const defaultRegistration: RegistrationCreate = {
  student_id: "",
  session_id: "",
  //   status: "Pending",
};

export function RegistrationFormProvider({
  children,
  mode,
  defaultValues,
}: Readonly<FormProviderProps<RegistrationCreate | RegistrationUpdate>>) {
  const validator =
    mode === "CREATE" ? registrationCreateSchema : registrationUpdateSchema;
  const form = useForm<RegistrationCreate | RegistrationUpdate>({
    resolver: zodResolver(validator),
    defaultValues: defaultValues ?? defaultRegistration,
  });
  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync: createRegistration, isPending: isCreating } =
    api.registration.create.useMutation({
      onSuccess() {
        toast.success("Created successfully");
        router.push(ROUTE.HOME.registration.root.path);
        utils.registration.list.invalidate();
      },
    });
  const { mutateAsync: updateRegistration, isPending: isUpdating } =
    api.registration.update.useMutation({
      onSuccess(_a, vars) {
        toast.success("Updated successfully");
        router.push(ROUTE.HOME.registration.root.path);
        utils.registration.list.invalidate();
        utils.registration.detail.invalidate({ id: vars.id });
      },
    });

  const onSubmit = useCallback(
    async (values: RegistrationCreate | RegistrationUpdate) => {
      switch (mode) {
        case "CREATE":
          await createRegistration(values as RegistrationCreate);
          break;
        case "EDIT":
          await updateRegistration(values as RegistrationUpdate);
          break;
        default:
          break;
      }
    },
    [createRegistration, mode, updateRegistration]
  );

  return (
    <RegistrationFormContext.Provider
      value={{
        form,
        defaultValues,
        mode,
        onSubmit: form.handleSubmit(onSubmit),
        isPending: isCreating || isUpdating,
      }}
    >
      {children}
    </RegistrationFormContext.Provider>
  );
}

export function useRegistrationForm() {
  const ctx = use(RegistrationFormContext);
  if (!ctx) throw new Error("Hook used outside Provider!");
  return ctx;
}
