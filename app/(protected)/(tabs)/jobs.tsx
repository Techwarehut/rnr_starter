import SelectJob from "~/components/ScreenComponents/SelectJobs";
import { useAuth } from "~/ctx/AuthContext";

export default function JobScreen() {
  const { user } = useAuth();
  return <SelectJob user={user} />;
}
