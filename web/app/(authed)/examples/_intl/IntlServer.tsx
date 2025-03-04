import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";

export async function IntlServer() {
  const t = await getTranslations("Example");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server</CardTitle>
        <CardDescription>
          Get translation strings using <Code>await getTranslations()</Code>
        </CardDescription>
      </CardHeader>
      <CardContent>{t("title")}</CardContent>
    </Card>
  );
}
