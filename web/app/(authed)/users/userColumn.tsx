import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { createColumnHelper } from "@tanstack/react-table";
import { UserFormDialog } from "./user-info-dialog/UserInfoDialog";
import { Pencil, Trash } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { api } from "@/protocol/trpc/client";

const col = createColumnHelper<User>();


export function getUserColumns() {
    const deleteUser = api.user.delete.useMutation();
    const apiUtils = api.useUtils();
    const userColumns = [
        col.display({
            header: "Name",
            cell: ({ row }) => row.original.name
        }),
        col.display({
            header: "Email",
            cell: ({ row }) => row.original.email
        }),
        col.display({
            header: "ROLE",
            cell: ({ row }) => row.original.role
        }),
        col.display({
            header: "Actions",
            cell: ({ row }) => <div className="flex space-x-2">
                <UserFormDialog mode="EDIT" asChild defaultValue={row.original}>
                    <Button className="h-fit p-1 [&_svg]:size-5" variant="ghost">
                        <Pencil />
                    </Button>
                </UserFormDialog>
                <ConfirmDialog
                    asChild
                    onConfirm={() => {
                        if (!row.original.id) return;
                        deleteUser.mutateAsync(row.original.id).then((res) => {
                            console.log("RES", res)
                            apiUtils.user.list.invalidate()
                        })
                    }}
                    text={{
                        header: `Delete ${row.original.name}?`,
                        description:
                            "Deleting the user will remove all its rooms and their associated data. This action cannot be undone. Are you sure you want to delete?",
                    }}
                    variant="destructive"
                >
                    <Button className="h-fit p-1 [&_svg]:size-5" variant="ghost">
                        <Trash className="text-destructive" />
                    </Button>
                </ConfirmDialog>
            </div>
        })
    ];
    return userColumns;
}