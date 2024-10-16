#!/usr/bin/env node

import chalk from "chalk";

import { program } from "./program.js"

import { promptAwsUser } from "./prompts/prompt-aws-user.js";
import { displayAppLogo } from "./display/app-logo.js";
import { promptProjectName } from "./prompts/prompt-project-name.js";
import { promptTechStack, TechStack } from "./prompts/prompt-tech-stack.js";
import { spinner } from "./prompts/spinner.js";
import { printFeedbackInfo, printProcessStart } from "./prompts/print-feedback-info.js";

const handleSigTerm = () => process.exit(0)

process.on('SIGINT', handleSigTerm)
process.on('SIGTERM', handleSigTerm)

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
    printProcessStart(projectName, techStack);

    setTimeout(() => {
      spinner.succeed(chalk.green("Not really done."));
    }, 3000);
  });

program.parse();
