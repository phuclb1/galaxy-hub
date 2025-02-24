import { FormMode } from "@/lib/utils";
import { api } from "@/protocol/trpc/client";
import { User, UserCreateUpdate, userFormSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface UserContextProps {
    form: UseFormReturn<UserCreateUpdate>;
    mode: FormMode;
    onSubmit: (values: UserCreateUpdate) => void | Promise<void>;
}
const UserFormContext = createContext<Partial<UserContextProps>>({});

export function UserFormProvider({
    children,
    defaultValue,
    mode,
}: {
    mode: FormMode;
    defaultValue?: User;
    children: ReactNode;
}) {
    const form = useForm<UserCreateUpdate>({
        resolver: zodResolver(userFormSchema),
        defaultValues: defaultValue,
    });

    const apiUtils = api.useUtils();

    const updateMutation = api.user.update.useMutation({
        onSuccess(_data, variables) {
            toast.success(`User ${variables.body.name} updated!`);
            apiUtils.user.list.invalidate();
        },
        onError(_, variables) {
            toast.error(`Updating user ${variables.body.name} failed`);
        },
    });
    const createMutation = api.user.create.useMutation({
        onSuccess(_data, variables) {
            toast.success(`User ${variables.name} created!`);
            apiUtils.user.list.invalidate();
        },
        onError() {
            toast.error("Creating user failed");
        },
    });


    async function onSubmit(values: User) {
        console.log("ON SUBMIT", mode, values)
        switch (mode) {
            case "CREATE": {
                console.log("MUTATE", values)
                createMutation.mutateAsync(values).then(async () => {
                    console.log("XXXXX")
                });
                break;
            }
            case "EDIT":
                if (defaultValue?.id)
                    updateMutation.mutate({ id: defaultValue?.id, body: values });
                else throw new Error("Missing user_id");
                break;
            default:
                break;
        }
    }

    return (
        <UserFormContext.Provider
            value={{
                form,
                mode,
                onSubmit,
            }}
        >
            {children}
        </UserFormContext.Provider>
    );
}

export function useUserForm() {
    const { form, mode, onSubmit } = useContext(UserFormContext);
    if (!form)
        throw new Error(
            "form is not defined, make sure to call this hook inside the form provider",
        );
    if (!mode) throw new Error("form mode is not defined");
    if (!onSubmit) throw new Error("onSubmit is not defined");
    return { form, mode, onSubmit };
}
