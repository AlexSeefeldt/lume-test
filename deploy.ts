import * as colors from "@std/fmt/colors";

// enter generated output directory
Deno.chdir("_site")

const deploy_repo_key = "DEPLOY_REPO"

if (!Deno.env.has(deploy_repo_key)) {
  throw new Error(`Environment variable ${deploy_repo_key} not set`);
}

Deno.createSync(".nojekyll");

// init an empty git repository there, add and commit everything,
// and force-push it to our github repository
const git_commands = [
  ["init", "-b", "deploy"],
  ["config", "user.name", "deploy script"],
  ["config", "user.email", ""],
  ["config", "core.sshCommand", "ssh -o StrictHostKeyChecking=accept-new"],
  ["add", "."],
  ["commit", "-m", "deploy"],
  ["remote", "add", "origin", `git@github.com:${Deno.env.get(deploy_repo_key)}.git`],
  ["push", "-fu", "origin", "deploy"],
]

for (const args of git_commands) {
  console.log(`${colors.green(">")} ${colors.bold(`git ${args.join(" ")}`)}`);
  const { success, stdout, stderr } = new Deno.Command("git", { args }).outputSync();
  Deno.stdout.writeSync(stdout);
  Deno.stderr.writeSync(stderr);
  if (!success) {
    throw new Error("Fatal: git command failed");
  }
}
