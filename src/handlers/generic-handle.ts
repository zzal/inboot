import { templates } from "../examples/index.js";
import { TechStack } from "../prompts/prompt-tech-stack.js";
import { nextInstall } from "./next-install.js";
import { stackInstall } from "./stack-install.js";

async function* genericHandle(templateKey: string, projectName: string, techStack?: TechStack) {
  yield await nextInstall(templates[templateKey].exampleUrl, projectName);
  if (techStack != null) {
    yield await stackInstall(techStack, projectName);
  }
}

export { genericHandle };
