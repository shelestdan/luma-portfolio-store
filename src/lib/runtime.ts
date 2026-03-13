const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET ?? "app";

export const repoName = "luma-portfolio-store";
export const isGitHubPages = deployTarget === "github-pages";
export const hasLiveApi = !isGitHubPages;
export const publicPagesUrl = `https://shelestdan.github.io/${repoName}/`;
