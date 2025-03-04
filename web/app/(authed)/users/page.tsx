"use client";

import { DataTable } from "@/components/shared/table/DataTable"
import { useTable } from "@/components/shared/table/useTable";
import { getUserColumns } from "./userColumn";
import { Button } from "@/components/ui/button";
import { api } from "@/protocol/trpc/client";
import { useState } from "react";
import { UserFormDialog } from "./user-info-dialog/UserInfoDialog";
import { Plus } from "lucide-react";

export default function UserManagmentPage() {
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const { data } = api.user.list.useQuery({ page: 1, page_size: 10, query: "" });

    const { table } = useTable({
        data: data?.users || [],
        columns: getUserColumns(),
    });

    return <div className="p-4">
        <h2>User management</h2>

        <UserFormDialog mode="CREATE" asChild>
            <Button className="gap-1" variant="default">
                <Plus />
                Create User
            </Button>
        </UserFormDialog>

        <DataTable table={table} title="User management" />

    </div>
}