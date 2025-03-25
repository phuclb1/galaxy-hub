import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/lib/schemas/students";
import { cn } from "@/lib/utils";
import { ComponentPropsWithRef } from "react";

export function StudentCard({
  student,
  className,
  ...props
}: {
  student: Student;
} & ComponentPropsWithRef<"div">) {
  return (
    <div className="flex flex-col gap-2">
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Student Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {student.user.name}</div>
              <div>Email: {student.user.email}</div>
              <div>Role: {student.user.role}</div>
              <div>Phone Number: {student.user.phone_number ?? "null"}</div>
              <div>Address: {student.user.address ?? "null"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className={cn("", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Parent Infomation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div>Name: {student.parent.name}</div>
              <div>Email: {student.parent.email}</div>
              <div>Role: {student.parent.role}</div>
              <div>Phone Number: {student.parent.phone_number ?? "null"}</div>
              <div>Address: {student.parent.address ?? "null"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
