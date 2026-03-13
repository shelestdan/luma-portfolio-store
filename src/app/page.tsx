import { HomeExperience } from "@/components/home/HomeExperience";
import { getHomepageData } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getHomepageData();

  return (
    <main>
      <HomeExperience {...data} />
    </main>
  );
}
