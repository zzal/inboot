#!/usr/bin/env node

import { program } from "./program.js"

import { promptAwsUser } from "./prompts/prompt-aws-user.js";
import { displayAppLogo } from "./display/app-logo.js";
import { promptProjectName } from "./prompts/prompt-project-name.js";
import { promptTechStack } from "./prompts/prompt-tech-stack.js";
import { printFeedbackInfo } from "./prompts/print-feedback-info.js";
import { promptTemplate } from "./prompts/prompt-template.js";
import { GITHUB_REPO, templates } from "./config/templates.js";
import { execute } from "./child-process.js";
import { spinner } from "./prompts/spinner.js";

const handleSigTerm = () => process.exit(0)

process.on('SIGABRT', handleSigTerm);
process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

program.command('init')
  .description('Bootstrap a new project')
  .argument('[name]', 'name of the project')
  .option('-D --default-profile')
  .option('--template <char>')
  .action(async (name?: string, options?) => {
    displayAppLogo();

    const useDefault = options?.defaultProfile ?? false;

    if (!useDefault) {
      const user = await promptAwsUser();
      if (user != null) {
        printFeedbackInfo("Using AWS access key ID:", user.accessKeyId);
      }
    }
    const [projectName, hasChanged] = await promptProjectName(name);
    printFeedbackInfo("Using project name:", projectName, hasChanged);

    const techStack = await promptTechStack();
    printFeedbackInfo("Using IaC framework:", techStack);

    const templateKey = await promptTemplate();
    printFeedbackInfo("Using what template:", templateKey);

    // printProcessStart(projectName, templateKey, techStack);

    try {
      const done = await execute("npx", [
        "create-next-app@latest",
        "--example",
        `${GITHUB_REPO}/${templates[templateKey]}`,
        "--use-npm",
        projectName,
      ]);
      if (done) {
        spinner.succeed("Done!");
      }
    } catch (e) {
      spinner.fail(String(e));
    }
  });

program.parse();
