import { ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserFormProvider } from "./UserFormProvider";
import { FormMode } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { UserForm } from "./UserForm";
import { UserFormSubmitButton } from "./UserSubmitButton";

export function UserFormDialog({
    asChild,
    children,
    defaultValue,
    mode,
}: {
    asChild?: boolean;
    children: ReactNode;
    defaultValue?: User;
    mode: FormMode;
}) {
    const [open, setOpen] = useState(false);
    console.log(defaultValue)
    function headerLabel() {
        switch (mode) {
            case "CREATE":
                return "Create new User";
            case "VIEW":
                return defaultValue?.name ?? "User";
            case "EDIT":
                return "Rename User";
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <DialogHeader>{headerLabel()}</DialogHeader>
                    <DialogDescription aria-describedby={undefined} />
                </DialogTitle>


                <UserFormProvider mode={mode} defaultValue={defaultValue}>
                    <UserForm />
                    <div className="mt-6 flex justify-end gap-3 px-3">
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                        <UserFormSubmitButton
                            type="submit"
                            variant="default"
                            onSubmitSuccess={() => {
                                setOpen(false);
                            }}
                        />
                    </div>
                </UserFormProvider>
            </DialogContent>
        </Dialog>
    );
}
