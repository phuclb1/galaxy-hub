"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    if (error.message.startsWith("UNAUTHORIZED")) {
      signOut();
    }
  }, [error]);

  if (error.message.startsWith("UNAUTHORIZED")) return null;
  return null;
}
