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

export function UserBlock() {
  const { form } = useStudentForm();
  const [openUser, setOpenUser] = React.useState(false);
  const { data: users = [] } = api.user.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.users.filter((user) => user.role == "Student") }
  );

  return (
    <FormField
      control={form.control}
      name="user_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User</FormLabel>
          <Popover open={openUser} onOpenChange={setOpenUser}>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  type="text"
                  defaultValue={
                    users?.find((user) => user.id === field.value)?.name || ""
                  }
                  readOnly
                  placeholder="Select User"
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {users?.map((user) => (
                    <CommandItem
                      key={user.id}
                      onSelect={() => {
                        field.onChange(user.id);
                        setOpenUser(false);
                      }}
                    >
                      {user.name}
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
