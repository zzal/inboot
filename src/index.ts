#!/usr/bin/env node

import { program } from "./program.js"

import { promptAwsUser } from "./prompts/prompt-aws-user.js";
import { displayAppLogo } from "./display/app-logo.js";
import { promptProjectName } from "./prompts/prompt-project-name.js";
import { promptTechStack } from "./prompts/prompt-tech-stack.js";
import { printFeedbackInfo } from "./prompts/print-feedback-info.js";
import { promptTemplate } from "./prompts/prompt-template.js";
import { templates } from "./examples/index.js";

import { nextInstall } from "./handlers/next-install.js";

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

    const selectedTemplate = templates[templateKey];

    if (selectedTemplate.handle != null) {
      try {
        for await (const stepPassed of selectedTemplate.handle(templateKey, projectName, techStack)) {
          if (!stepPassed) {
            program.error("Not finished!! 😱");
          }
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      await nextInstall(templates[templateKey].exampleUrl, projectName);
    }

    process.exit(0);
    // printProcessStart(projectName, templateKey, techStack);

  });

program.parse();
