import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuthExample } from "./_authentication/AuthExample";
import { DataFetchingExample } from "./_dataFetching/DataFetchingExample";
import { IntlExample } from "./_intl/IntlExample";
import { StateExample } from "./_state/StateExample";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold">Examples</h1>

      <span>Delete this folder after development has started!</span>

      <Accordion type="multiple">
        <AccordionItem value="auth">
          <AccordionTrigger>Authentication</AccordionTrigger>
          <AccordionContent>
            <AuthExample />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="scopeddata">
          <AccordionTrigger>Data fetching</AccordionTrigger>
          <AccordionContent>
            <DataFetchingExample />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="intl">
          <AccordionTrigger>I18n</AccordionTrigger>
          <AccordionContent>
            <IntlExample />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="state">
          <AccordionTrigger>State library</AccordionTrigger>
          <AccordionContent>
            <StateExample />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="table">
          <AccordionTrigger>Table data</AccordionTrigger>
          <AccordionContent>TODO</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
