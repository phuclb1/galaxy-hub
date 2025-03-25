"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useTeamForm } from "./TeamFormProvider";
import { actionLabelFromMode } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function TeamFormSubmitButton({
  children,
  ...props
}: Readonly<Omit<ButtonProps, "onClick">>) {
  const { mode, onSubmit, isPending } = useTeamForm();
  const label = actionLabelFromMode(mode);
  const path = usePathname();
  if (mode === "VIEW")
    return (
      <Link className="w-fit" href={`${path}/edit`}>
        <Button {...props}>{children ?? label}</Button>
      </Link>
    );
  return (
    <Button disabled={isPending} {...props} onClick={onSubmit}>
      {children ?? label}
    </Button>
  );
}
