"use client";

import { ComponentPropsWithRef } from "react";
import { useRegistrationForm } from "./RegistrationFormProvider";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { StudentAndSession } from "./formBlocks/StudentAndSession";

export function RegistrationForm({
  className,
  ...props
}: Readonly<Omit<ComponentPropsWithRef<"form">, "onSubmit">>) {
  const { form, onSubmit } = useRegistrationForm();

  return (
    <Form {...form}>
      <form
        className={cn("grid grid-cols-2 gap-4 lg:grid-cols-2", className)}
        {...props}
        onSubmit={onSubmit}
      >
        <StudentAndSession />
      </form>
    </Form>
  );
}
