#!/usr/bin/env node --no-warnings=ExperimentalWarning

import chalk from "chalk";
import ora from "ora";

import { program } from "./program.js"

import { promptAwsUser } from "./prompts/prompt-aws-user.js";
import { displayAppLogo } from "./display/app-logo.js";
import { promptProjectName } from "./prompts/prompt-project-name.js";
import { promptTechStack, TechStack } from "./prompts/prompt-tech-stack.js";

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

    const spinner = ora();
    if (!useDefault) {
      const user = await promptAwsUser();
      if (user != null) {
        spinner.info(`Using AWS access key ID: ${user.accessKeyId}`);
      }
    }
    const projectName = await promptProjectName(name);
    const techStack = await promptTechStack();
    if (techStack === TechStack.AMPLIFY) {
      program.error("Amplify init not implemented yet.");
    }
    spinner.start(`Creating ${projectName} using ${techStack} on AWS…`);

    setTimeout(() => {
      spinner.succeed(chalk.green("Not really done."));
    }, 3000);
  });

program.parse();
