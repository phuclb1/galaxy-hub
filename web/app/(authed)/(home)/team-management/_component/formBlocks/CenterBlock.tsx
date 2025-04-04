import { api } from "@/protocol/trpc/client";
import { useTeamForm } from "../TeamFormProvider";
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

export function CenterBlock() {
  const { form } = useTeamForm();
  const [openCenter, setOpenCenter] = React.useState(false);
  const { data: centers = [] } = api.center.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.centers }
  );

  return (
    <FormField
      control={form.control}
      name="center_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Center</FormLabel>
          <Popover open={openCenter} onOpenChange={setOpenCenter}>
            <PopoverTrigger asChild>
              <FormControl>
                <Input
                  type="text"
                  defaultValue={
                    centers?.find((center) => center.id === field.value)
                      ?.name || ""
                  }
                  readOnly
                  placeholder="Select Center"
                />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {centers?.map((center) => (
                    <CommandItem
                      key={center.id}
                      onSelect={() => {
                        field.onChange(center.id);
                        setOpenCenter(false);
                      }}
                    >
                      {center.name}
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
