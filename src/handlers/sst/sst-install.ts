import { execute } from "../execute.js";

async function* stepsSstInstall(projectName: string) {
  yield await execute("npm", ["install", "-E", "sst@ion"]);
  yield await execute("sst", ["init", "--yes"]);
}

export const installSst = async (projectName: string) => {
  for await (const done of stepsSstInstall(projectName)) {
    if (!done) {
      return false;
    }
  }
  return true;
}
