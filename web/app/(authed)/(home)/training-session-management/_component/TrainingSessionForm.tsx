"use client";

import { ComponentPropsWithRef, useState } from "react";
import { useTrainingSessionForm } from "./TrainingSessionFormProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CoachAndTeamBlock } from "./formBlocks/CoachAndTeamBlock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sessionTypeEnum } from "@/lib/schemas/trainingsession";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export function TrainingSessionForm({
  className,
  ...props
}: Readonly<Omit<ComponentPropsWithRef<"form">, "onSubmit">>) {
  const { form, onSubmit } = useTrainingSessionForm();

  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      form.setValue("start_date", selectedDate.getTime()); // Use `setValue` if you want to update the form state
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("grid grid-cols-2 gap-4 lg:grid-cols-2", className)}
        {...props}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Training session name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CoachAndTeamBlock />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={
                        date
                          ? format(date, "yyyy-MM-dd")
                          : field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                      }
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        setDate(selectedDate);
                        form.setValue("start_date", selectedDate.getTime());
                      }}
                      placeholder="Pick start date"
                    />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="session_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sessionTypeEnum.options.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
