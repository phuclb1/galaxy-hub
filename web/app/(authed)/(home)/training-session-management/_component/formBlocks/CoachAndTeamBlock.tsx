import { api } from "@/protocol/trpc/client";
import { useTrainingSessionForm } from "../TrainingSessionFormProvider";
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

export function CoachAndTeamBlock() {
  const { form } = useTrainingSessionForm();
  const [openCoach, setOpenCoach] = React.useState(false);
  const [openTeam, setOpenTeam] = React.useState(false);
  const { data: coaches = [] } = api.user.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.users.filter((coach) => coach.role == "Coach") }
  );
  const { data: teams = [] } = api.team.list.useQuery(
    { page: 1, page_size: 100 },
    { select: (data) => data.teams }
  );

  return (
    <>
      <FormField
        control={form.control}
        name="coach_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coach</FormLabel>
            <Popover open={openCoach} onOpenChange={setOpenCoach}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    type="text"
                    defaultValue={
                      coaches?.find((coach) => coach.id === field.value)
                        ?.name || ""
                    }
                    readOnly
                    placeholder="Select Coach"
                  />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {coaches?.map((coach) => (
                      <CommandItem
                        key={coach.id}
                        onSelect={() => {
                          field.onChange(coach.id);
                          setOpenCoach(false);
                        }}
                      >
                        {coach.name}
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
        name="team_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team</FormLabel>
            <Popover open={openTeam} onOpenChange={setOpenTeam}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    type="text"
                    defaultValue={
                      teams?.find((team) => team.id === field.value)?.name || ""
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
                        onSelect={() => {
                          field.onChange(team.id);
                          setOpenTeam(false);
                        }}
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
    </>
  );
}
