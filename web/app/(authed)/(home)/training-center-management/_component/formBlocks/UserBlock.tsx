import { api } from "@/protocol/trpc/client";
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
import { useCenterForm } from "../CenterFormProvider";

export function UserBlock() {
  const { form } = useCenterForm();
  const { data: users = [] } = api.user.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.users.filter((user) => user.role == "Manager") }
  );

  return (
    <FormField
      control={form.control}
      name="manager_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  type="text"
                  value={
                    field.value
                      ? users?.find((user) => user.id === field.value)?.name
                      : ""
                  }
                  readOnly
                  placeholder="Select Manager"
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
                      onSelect={() => field.onChange(user.id)}
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
