import { connection } from "next/server";

import { isGitHubPages } from "@/lib/runtime";

export async function enableDynamicRendering() {
  if (!isGitHubPages) {
    await connection();
  }
}
