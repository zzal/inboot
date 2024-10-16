import { execute } from "./execute.js";
import { spinner } from "../prompts/spinner.js";
import { resolve } from "node:path";

export const nextInstall = async (url: string, projectName: string) => {
  try {
    const done = await execute("npx", [
      "create-next-app@latest",
      "--example",
      `${url}`,
      "--use-npm",
      projectName,
    ]);
    if (done) {
      spinner.succeed("Next app installed.");
      process.chdir(resolve(process.cwd(), projectName));
      await execute("pwd", []);
      return true;
    }
  } catch (e) {
    spinner.fail(String(e));
  }
  return false;
}
