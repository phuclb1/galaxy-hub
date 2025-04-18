import { api } from "@/protocol/trpc/client";
import { useStudentForm } from "../StudentFormProvider";
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

export function ParentBlock() {
  const { form } = useStudentForm();
  const [openParent, setOpenParent] = React.useState(false);
  const { data: parents = [] } = api.user.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.users.filter((user) => user.role == "Parent") }
  );

  return (
    <FormField
      control={form.control}
      name="parent_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Parent</FormLabel>
          <Popover open={openParent} onOpenChange={setOpenParent}>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  type="text"
                  defaultValue={
                    parents?.find((parent) => parent.id === field.value)
                      ?.name || ""
                  }
                  readOnly
                  placeholder="Select Parent"
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {parents?.map((parent) => (
                    <CommandItem
                      key={parent.id}
                      onSelect={() => {
                        field.onChange(parent.id);
                        setOpenParent(false);
                      }}
                    >
                      {parent.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
