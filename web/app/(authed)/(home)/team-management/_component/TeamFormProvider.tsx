"use client";

import { ROUTE } from "@/lib/constants";
import {
  TeamCreate,
  teamCreateSchema,
  TeamUpdate,
  teamUpdateSchema,
} from "@/lib/schemas/teams";
import { FormContextReturn, FormProviderProps } from "@/lib/types";
import { api } from "@/protocol/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, use, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TeamFormContext = createContext<
  FormContextReturn<TeamCreate | TeamUpdate> | undefined
>(undefined);

const defaultTeam: TeamCreate = {
  name: "",
  coach_id: "",
  center_id: "",
};

export function TeamFormProvider({
  children,
  mode,
  defaultValues,
}: Readonly<FormProviderProps<TeamCreate | TeamUpdate>>) {
  const validator = mode === "CREATE" ? teamCreateSchema : teamUpdateSchema;
  const form = useForm<TeamCreate | TeamUpdate>({
    resolver: zodResolver(validator),
    defaultValues: defaultValues ?? defaultTeam,
  });
  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync: createTeam, isPending: isCreating } =
    api.team.create.useMutation({
      onSuccess() {
        toast.success("Created successfully");
        router.push(ROUTE.HOME.team.root.path);
        utils.team.list.invalidate();
      },
    });
  const { mutateAsync: updateTeam, isPending: isUpdating } =
    api.team.update.useMutation({
      onSuccess(_a, vars) {
        toast.success("Updated successfully");
        router.push(ROUTE.HOME.team.root.path);
        utils.team.list.invalidate();
        utils.team.detail.invalidate({ id: vars.id });
      },
    });

  const onSubmit = useCallback(
    async (values: TeamCreate | TeamUpdate) => {
      switch (mode) {
        case "CREATE":
          await createTeam(values as TeamCreate);
          break;
        case "EDIT":
          await updateTeam(values as TeamUpdate);
          break;
        default:
          break;
      }
    },
    [createTeam, mode, updateTeam]
  );

  return (
    <TeamFormContext.Provider
      value={{
        form,
        defaultValues,
        mode,
        onSubmit: form.handleSubmit(onSubmit),
        isPending: isCreating || isUpdating,
      }}
    >
      {children}
    </TeamFormContext.Provider>
  );
}

export function useTeamForm() {
  const ctx = use(TeamFormContext);
  if (!ctx) throw new Error("Hook used outside Provider!");
  return ctx;
}
