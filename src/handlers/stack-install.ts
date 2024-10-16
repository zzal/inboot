import { TechStack } from "../prompts/prompt-tech-stack.js";
import { spinner } from "../prompts/spinner.js";
import { installSst } from "./sst/sst-install.js";

const initAmplify = async (): Promise<boolean> => {
  spinner.fail("Amplify Stack is not implemented yet.");
  return false;
}

export const stackInstall = async (techStack: TechStack, projectName: string) => {
  try {
    switch (techStack) {
      case TechStack.SST:
        return await installSst(projectName);
      case TechStack.AMPLIFY:
        return await initAmplify();
    }
  } catch (e) {
    spinner.fail(String(e));
  }
  return false;
}
