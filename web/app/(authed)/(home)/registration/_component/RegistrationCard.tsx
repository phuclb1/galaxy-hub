import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Registration } from "@/lib/schemas/registration";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ComponentPropsWithRef } from "react";

export function RegistrationCard({
  registration,
  className,
  ...props
}: {
  registration: Registration;
} & ComponentPropsWithRef<"div">) {
  return (
    <div className="flex flex-col gap-2">
      <div>Status: {registration.status}</div>
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Student Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {registration.student.user.name}</div>
              <div>Email: {registration.student.user.email}</div>
              <div>Role: {registration.student.user.role}</div>
              <div>
                Phone Number: {registration.student.user.phone_number ?? "null"}
              </div>
              <div>Address: {registration.student.user.address ?? "null"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Training Session Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {registration.session.name}</div>
              <div>
                Start date:{" "}
                {format(
                  new Date(registration.session.start_date),
                  "dd-MM-yyyy"
                )}
              </div>
              <div>
                Training Session Type: {registration.session.session_type}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
