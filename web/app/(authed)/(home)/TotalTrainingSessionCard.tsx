"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/protocol/trpc/client";
import { ComponentPropsWithRef, useMemo } from "react";

export function TotalTrainingSessionCard({
  className,
  ...props
}: Readonly<ComponentPropsWithRef<"div">>) {
  const { data: queryData } = api.training_session.list.useQuery({
    page: 1,
    page_size: 9999,
  });
  const data = useMemo(() => queryData?.total ?? 0, [queryData]);

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Total Training Session
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">{data}</div>
      </CardContent>
    </Card>
  );
}
