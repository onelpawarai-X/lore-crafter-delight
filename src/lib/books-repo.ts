// The GitHub repository the library reads submissions from. The env overrides
// let a deployment point at a fork without touching code.
export const BOOKS_REPO = {
  owner: process.env["BOOKS_REPO_OWNER"] ?? "onelpawarai-X",
  name: process.env["BOOKS_REPO_NAME"] ?? "lore-crafter-delight",
  branch: process.env["BOOKS_REPO_BRANCH"] ?? "main",
} as const;

const USER_AGENT = "lore-crafter-delight";

export function repoFileUrl(path: string): string {
  const { owner, name, branch } = BOOKS_REPO;
  return `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${path}`;
}

// raw.githubusercontent.com cannot serve a private repository, so when a token
// is configured the file comes from the contents API instead.
export async function fetchRepoFile(path: string): Promise<Response> {
  const token = process.env["GITHUB_TOKEN"];
  if (!token) {
    return fetch(repoFileUrl(path), { headers: { "User-Agent": USER_AGENT } });
  }
  const { owner, name, branch } = BOOKS_REPO;
  return fetch(
    `https://api.github.com/repos/${owner}/${name}/contents/${path}?ref=${branch}`,
    {
      headers: {
        Accept: "application/vnd.github.raw+json",
        Authorization: `Bearer ${token}`,
        "User-Agent": USER_AGENT,
      },
    },
  );
}
