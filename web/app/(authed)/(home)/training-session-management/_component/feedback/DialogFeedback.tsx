"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrainingSession } from "@/lib/schemas/trainingsession";
import { User } from "next-auth";
import { ComponentPropsWithRef, useState } from "react";
import { FeedbackFormProvider } from "./FeedbackFormProvider";
import { FeedbackForm } from "./FeedbackForm";
import { FeedbackFormSubmitButton } from "./FeedbackFormSubmitButton";

export function DialogFeedback({
  user,
  session,
}: {
  user: User;
  session: TrainingSession;
} & ComponentPropsWithRef<"div">) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <div
          role="button"
          className="cursor-pointer w-fit underline"
          aria-label="Open Dialog"
        >
          Feedback
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Feedback Form</DialogTitle>
        <FeedbackFormProvider user={user} session={session} mode="CREATE">
          <FeedbackForm />
          <FeedbackFormSubmitButton
            className="w-fit"
            handleDialogClose={handleDialogClose}
          />
        </FeedbackFormProvider>
      </DialogContent>
    </Dialog>
  );
}
