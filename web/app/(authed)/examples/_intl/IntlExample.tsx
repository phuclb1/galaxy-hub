import { IntlClient } from "./IntlClient";
import { IntlServer } from "./IntlServer";

export function IntlExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <IntlClient />
      <IntlServer />
    </div>
  );
}
