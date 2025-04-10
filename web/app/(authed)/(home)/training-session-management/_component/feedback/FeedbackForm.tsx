"use client";

import { ComponentPropsWithRef } from "react";
import { useFeedbackForm } from "./FeedbackFormProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function FeedbackForm({
  className,
  ...props
}: Readonly<Omit<ComponentPropsWithRef<"form">, "onSubmit">>) {
  const { form, onSubmit, user, session } = useFeedbackForm();
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-4", className)}
        {...props}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <Input {...field} value={user?.name} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="session_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session</FormLabel>
              <FormControl>
                <Input {...field} value={session?.name} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Context</FormLabel>
              <FormControl>
                <Textarea {...field} autoFocus placeholder="Feedback Context" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
