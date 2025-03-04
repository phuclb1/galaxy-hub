import { Button } from "@/components/ui/button";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { useUserForm } from "./UserFormProvider";

export const UserFormSubmitButton = forwardRef<
    HTMLButtonElement,
    ComponentPropsWithoutRef<typeof Button> & { onSubmitSuccess?: () => void }
>(function UserFormSubmitButton({ onSubmitSuccess, ...props }, ref) {
    const { mode, onSubmit, form } = useUserForm();
    const [loading, setLoading] = useState(false);
    return (
        <Button
            ref={ref}
            {...props}
            onClick={async () => {
                try {
                    setLoading(true);
                    await form.handleSubmit(onSubmit)();
                    // close the dialog if needed
                    if (onSubmitSuccess && (await form.trigger())) onSubmitSuccess();
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }}
        >
            {getLabel(mode, loading)}
        </Button>
    );
});

function getLabel(mode: "CREATE" | "VIEW" | "EDIT", loading?: boolean): string {
    switch (mode) {
        case "CREATE":
            return loading ? "Creating..." : "Create";
        case "VIEW":
            return loading ? "Opening editor..." : "Edit";
        case "EDIT":
            return loading ? "Saving..." : "Save";
    }
}
