import { templates } from "./index.js";
import { TechStack } from "../prompts/prompt-tech-stack.js";
import { nextInstall } from "../handlers/next-install.js";
import { stackInstall } from "../handlers/stack-install.js";

async function* handleImageCat(templateKey: string, projectName: string, techStack?: TechStack) {
  yield await nextInstall(templates[templateKey].exampleUrl, projectName);
  if (techStack != null) {
    yield await stackInstall(techStack, projectName);
  }
}

export { handleImageCat };
