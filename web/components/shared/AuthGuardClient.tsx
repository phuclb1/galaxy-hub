"use client";

import { api } from "@/protocol/trpc/client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  viewableFor: string;
  loading?: ReactNode;
}
export function AuthGuardClient({ children, viewableFor, loading }: Props) {
  const { data } = api.auth.me.useQuery();

  if (!data) return loading ?? null;

  if (!viewableFor.includes(data.role)) {
    return null;
  }

  return children;
}
