import { cn } from "@/lib/utils";
import { ComponentPropsWithRef } from "react";

export const Input = ({
  className,
  type,
  ...props
}: ComponentPropsWithRef<"input">) => (
  <input
    className={cn(
      "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    type={type}
    {...props}
  />
);
