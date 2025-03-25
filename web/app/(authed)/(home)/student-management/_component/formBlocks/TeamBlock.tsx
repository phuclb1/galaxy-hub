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

export function TeamBlock() {
  const { form } = useStudentForm();
  const { data: teams = [] } = api.team.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.teams }
  );

  return (
    <FormField
      control={form.control}
      name="team_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Team</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  type="text"
                  value={
                    field.value
                      ? teams?.find((team) => team.id === field.value)?.name
                      : ""
                  }
                  readOnly
                  placeholder="Select Team"
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {teams?.map((team) => (
                    <CommandItem
                      key={team.id}
                      onSelect={() => field.onChange(team.id)}
                    >
                      {team.name}
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
