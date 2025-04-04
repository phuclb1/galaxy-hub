"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { actionLabelFromMode } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRegistrationForm } from "./RegistrationFormProvider";

export function RegistrationFormSubmitButton({
  children,
  ...props
}: Readonly<Omit<ButtonProps, "onClick">>) {
  const { mode, onSubmit, isPending } = useRegistrationForm();
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
