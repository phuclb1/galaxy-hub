"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

interface SelectDateProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function SelectDate({ selectedDate, onDateChange }: SelectDateProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(format(newDate, "yyyy-MM-dd"));
      setIsPopoverOpen(false);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            type="text"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            placeholder="Select date"
            readOnly
            className="pl-10"
          />
          <CalendarDays className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={new Date(selectedDate)}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
