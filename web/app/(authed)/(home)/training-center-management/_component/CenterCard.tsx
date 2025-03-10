import { ComponentPropsWithRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTE } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrainingCenter } from "@/lib/schemas/training-center";

export function CenterCard({
  center,
  className,
  ...props
}: {
  center: TrainingCenter;
} & ComponentPropsWithRef<"div">) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Training Center Information
          <Link href={ROUTE.HOME.trainingcenter.edit.path(center.id)}>
            <Button>Edit</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div>Name: {center.name}</div>
            <div>Address: {center.address}</div>
            <div>Type: {center.type}</div>
            <div>Department: {center.department}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
