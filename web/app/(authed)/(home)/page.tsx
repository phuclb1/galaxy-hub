import { TotalCoachCard } from "./TotalCard";
import { TotalTeamCard } from "./TotalTeamCard";
import { TotalTrainingCenterCard } from "./TotalTrainingCenterCard";
import { TotalTrainingSessionCard } from "./TotalTrainingSessionCard";

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
      <TotalCoachCard role="Coach" />
      <TotalCoachCard role="Student" />
      <TotalTrainingCenterCard />
      <TotalTeamCard />
      <TotalTrainingSessionCard />
    </div>
  );
}
