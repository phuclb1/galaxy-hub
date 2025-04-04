import { api } from "@/protocol/trpc/client";
import { useRegistrationForm } from "../RegistrationFormProvider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";

export function StudentAndSession() {
  const { form } = useRegistrationForm();
  const [openStudent, setOpenStudent] = React.useState(false);
  const [openSession, setOpenSession] = React.useState(false);
  const { data: students = [] } = api.student.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.students }
  );
  const { data: sessions = [] } = api.training_session.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.training_sessions }
  );

  return (
    <>
      <FormField
        control={form.control}
        name="student_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Student</FormLabel>
            <Popover open={openStudent} onOpenChange={setOpenStudent}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    type="text"
                    defaultValue={
                      students?.find((student) => student.id === field.value)
                        ?.user.name || "" // Set initial value based on the student name
                    }
                    readOnly
                    placeholder="Select Student"
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {students?.map((student) => (
                      <CommandItem
                        key={student.id}
                        onSelect={() => {
                          field.onChange(student.id);
                          setOpenStudent(false);
                        }}
                      >
                        {student.user.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="session_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Training Session</FormLabel>
            <Popover open={openSession} onOpenChange={setOpenSession}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    type="text"
                    defaultValue={
                      sessions?.find((session) => session.id === field.value)
                        ?.name || "" // Set initial value based on the session name
                    }
                    readOnly
                    placeholder="Select Training Session"
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sessions?.map((session) => (
                      <CommandItem
                        key={session.id}
                        onSelect={() => {
                          field.onChange(session.id);
                          setOpenSession(false);
                        }}
                      >
                        {session.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </>
  );
}
