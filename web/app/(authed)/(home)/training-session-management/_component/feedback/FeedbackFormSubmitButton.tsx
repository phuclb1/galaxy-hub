import { Button, ButtonProps } from "@/components/ui/button";
import { actionLabelFromMode } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFeedbackForm } from "./FeedbackFormProvider";

interface FeedbackFormSubmitButtonProps extends Omit<ButtonProps, "onClick"> {
  handleDialogClose?: () => void;
}

export function FeedbackFormSubmitButton({
  children,
  handleDialogClose,
  ...props
}: FeedbackFormSubmitButtonProps) {
  const { mode, onSubmit, isPending } = useFeedbackForm();
  const label = actionLabelFromMode(mode);
  const path = usePathname();

  const handleSubmit = () => {
    onSubmit();
    if (handleDialogClose) {
      handleDialogClose();
    }
  };

  if (mode === "VIEW")
    return (
      <Link className="w-fit" href={`${path}/edit`}>
        <Button {...props}>{children ?? label}</Button>
      </Link>
    );

  return (
    <Button disabled={isPending} {...props} onClick={handleSubmit}>
      {children ?? label}
    </Button>
  );
}
