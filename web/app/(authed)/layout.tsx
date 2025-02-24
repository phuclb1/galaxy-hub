import { Topbar } from "@/components/shared/Topbar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <Topbar />
      {children}
    </div>
  );
}
