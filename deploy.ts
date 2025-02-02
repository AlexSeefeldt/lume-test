// enter generated output directory
Deno.chdir("_site")

const deploy_repo_key = "DEPLOY_REPO"

if (!Deno.env.has(deploy_repo_key)) {
  throw new Error(`Environment variable ${deploy_repo_key} not set`);
}

// init an empty git repository there, add and commit everything,
// and force-push it to our github repository
const git_commands = `
init -b main
add .
commit -m deploy
remote add origin git@github.com:${Deno.env.get(deploy_repo_key)}.git
push -fu origin main
`.split("\n").slice(1, -1);

for (const line of git_commands) {
  const args = line.split(" ");
  console.log("%c> %cgit "+line, "color: green", "font-weight: bold")
  const process = new Deno.Command("git", { args, stdout: "piped", stderr: "piped" }).spawn();
  process.stdout.pipeTo(Deno.stdout.writable, { preventClose: true, preventCancel: true, preventAbort: true });
  process.stderr.pipeTo(Deno.stderr.writable, { preventClose: true, preventCancel: true, preventAbort: true });
  const { success } = await process.status;
  if (!success) {
    throw new Error("Fatal: git command failed");
  }
}
