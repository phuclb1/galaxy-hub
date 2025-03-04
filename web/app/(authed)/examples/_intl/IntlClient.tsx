"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code } from "@/components/ui/typography";

export function IntlClient() {
  const t = useTranslations("Example");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client</CardTitle>
        <CardDescription>
          Get translation strings using <Code>useTranslations()</Code>
        </CardDescription>
      </CardHeader>
      <CardContent>{t("title")}</CardContent>
    </Card>
  );
}
