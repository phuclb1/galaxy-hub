import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="container place-self-center py-10">{children}</div>;
}
