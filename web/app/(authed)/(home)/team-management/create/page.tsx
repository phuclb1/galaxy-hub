import { BackButton } from "@/components/shared/BackButton";
import { ROUTE } from "@/lib/constants";
import { TeamFormProvider } from "../_component/TeamFormProvider";
import { TeamForm } from "../_component/TeamForm";
import { TeamFormSubmitButton } from "../_component/TeamFormSubmitButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BackButton href={ROUTE.HOME.team.root.path} />
      <TeamFormProvider mode="CREATE">
        <TeamForm />
        <TeamFormSubmitButton className="w-fit" />
      </TeamFormProvider>
    </div>
  );
}
