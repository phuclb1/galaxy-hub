import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Team } from "@/lib/schemas/teams";
import { cn } from "@/lib/utils";
import { ComponentPropsWithRef } from "react";

export function TeamCard({
  team,
  className,
  ...props
}: {
  team: Team;
} & ComponentPropsWithRef<"div">) {
  return (
    <div className="flex flex-col gap-2">
      <div>Name: {team.name}</div>
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Coach Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {team.coach.name}</div>
              <div>Email: {team.coach.email}</div>
              <div>Role: {team.coach.role}</div>
              <div>Phone Number: {team.coach.phone_number ?? "null"}</div>
              <div>Address: {team.coach.address ?? "null"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Center Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {team.center.name}</div>
              <div>Address: {team.center.address}</div>
              <div>Type: {team.center.type}</div>
              <div>Department: {team.center.department}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
