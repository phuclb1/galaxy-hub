"use client";

import { ComponentPropsWithRef } from "react";
import { useStudentForm } from "./StudentFormProvider";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { UserBlock } from "./formBlocks/UserBlock";
import { TeamBlock } from "./formBlocks/TeamBlock";
import { ParentBlock } from "./formBlocks/ParentBlock";

export function StudentForm({
  className,
  ...props
}: Readonly<Omit<ComponentPropsWithRef<"form">, "onSubmit">>) {
  const { form, onSubmit } = useStudentForm();

  return (
    <Form {...form}>
      <form
        className={cn("grid grid-cols-2 gap-4 lg:grid-cols-2", className)}
        {...props}
        onSubmit={onSubmit}
      >
        <UserBlock />
        <TeamBlock />
        <ParentBlock />
      </form>
    </Form>
  );
}
