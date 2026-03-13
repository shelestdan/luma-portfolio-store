import { access, rename } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const parkedApiDir = path.join(root, "src", "app", "__api_runtime__");
async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm run build:pages:raw", {
      cwd: root,
      env: process.env,
      shell: true,
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`build:pages:raw exited with code ${code ?? "unknown"}.`));
    });

    child.on("error", reject);
  });
}

async function main() {
  if (process.env.NEXT_PUBLIC_DEPLOY_TARGET !== "github-pages") {
    await runBuild();
    return;
  }

  if (await exists(parkedApiDir)) {
    throw new Error("Temporary Pages build directory already exists: src/app/__api_runtime__");
  }

  const hasApiDir = await exists(apiDir);

  try {
    if (hasApiDir) {
      await rename(apiDir, parkedApiDir);
    }

    await runBuild();
  } finally {
    if (await exists(parkedApiDir)) {
      await rename(parkedApiDir, apiDir);
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
