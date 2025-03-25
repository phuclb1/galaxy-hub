"use client";

import { ROUTE } from "@/lib/constants";
import {
  StudentCreate,
  studentCreateSchema,
  StudentUpdate,
  studentUpdateSchema,
} from "@/lib/schemas/students";
import { FormContextReturn, FormProviderProps } from "@/lib/types";
import { api } from "@/protocol/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, use, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const StudentFormContext = createContext<
  FormContextReturn<StudentCreate | StudentUpdate> | undefined
>(undefined);

const defaultStudent: StudentCreate = {
  user_id: "",
  team_id: "",
  parent_id: "",
};

export function StudentFormProvider({
  children,
  mode,
  defaultValues,
}: Readonly<FormProviderProps<StudentCreate | StudentUpdate>>) {
  const validator =
    mode === "CREATE" ? studentCreateSchema : studentUpdateSchema;
  const form = useForm<StudentCreate | StudentUpdate>({
    resolver: zodResolver(validator),
    defaultValues: defaultValues ?? defaultStudent,
  });
  const router = useRouter();
  const utils = api.useUtils();

  const { mutateAsync: createStudent, isPending: isCreating } =
    api.student.create.useMutation({
      onSuccess() {
        toast.success("Created successfully");
        router.push(ROUTE.HOME.student.root.path);
        utils.student.list.invalidate();
      },
    });
  const { mutateAsync: updateStudent, isPending: isUpdating } =
    api.student.update.useMutation({
      onSuccess(_a, vars) {
        toast.success("Updated successfully");
        router.push(ROUTE.HOME.student.root.path);
        utils.student.list.invalidate();
        utils.student.detail.invalidate({ id: vars.id });
      },
    });

  const onSubmit = useCallback(
    async (values: StudentCreate | StudentUpdate) => {
      switch (mode) {
        case "CREATE":
          await createStudent(values as StudentCreate);
          break;
        case "EDIT":
          await updateStudent(values as StudentUpdate);
          break;
        default:
          break;
      }
    },
    [createStudent, mode, updateStudent]
  );

  return (
    <StudentFormContext.Provider
      value={{
        form,
        defaultValues,
        mode,
        onSubmit: form.handleSubmit(onSubmit),
        isPending: isCreating || isUpdating,
      }}
    >
      {children}
    </StudentFormContext.Provider>
  );
}

export function useStudentForm() {
  const ctx = use(StudentFormContext);
  if (!ctx) throw new Error("Hook used outside Provider!");
  return ctx;
}
