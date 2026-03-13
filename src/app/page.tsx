import { HomeExperience } from "@/components/home/HomeExperience";
import { enableDynamicRendering } from "@/lib/server-runtime";
import { getHomepageData } from "@/lib/store";

export default async function Home() {
  await enableDynamicRendering();
  const data = getHomepageData();

  return (
    <main>
      <HomeExperience {...data} />
    </main>
  );
}
