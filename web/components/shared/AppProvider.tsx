"use client";

import "jotai-devtools/styles.css";

import { TRPCProvider } from "@/protocol/trpc/client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { DevTools } from "jotai-devtools";
import { TooltipProvider } from "../ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

export function AppProvider({
  children,
  messages,
  locale,
}: Readonly<{
  children: ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}>) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>
        <TRPCProvider>
          <ThemeProvider attribute="class">
            <TooltipProvider delayDuration={200}>
              {children}
              <DevTools isInitialOpen={false} />
              <ReactQueryDevtools initialIsOpen={false} />

              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
