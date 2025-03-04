import { AuthenticationClient } from "./AuthenticationClient";
import { AuthenticationServer } from "./AuthenticationServer";

export function AuthExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <AuthenticationClient />
      <AuthenticationServer />
    </div>
  );
}
