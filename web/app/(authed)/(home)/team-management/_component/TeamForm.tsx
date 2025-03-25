"use client";

import { ComponentPropsWithRef } from "react";
import { useTeamForm } from "./TeamFormProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CoachBlock } from "./formBlocks/CoachBlock";
import { CenterBlock } from "./formBlocks/CenterBlock";

export function TeamForm({
  className,
  ...props
}: Readonly<Omit<ComponentPropsWithRef<"form">, "onSubmit">>) {
  const { form, mode, onSubmit } = useTeamForm();
  const disabled = mode === "VIEW";

  return (
    <Form {...form}>
      <form
        className={cn("grid grid-cols-2 gap-4 lg:grid-cols-2", className)}
        {...props}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          disabled={disabled}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CoachBlock />
        <CenterBlock />
      </form>
    </Form>
  );
}
