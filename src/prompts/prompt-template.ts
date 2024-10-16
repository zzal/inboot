import inquirer from "inquirer";

import { templates } from "../config/templates.js";

type TemplateKeys = keyof typeof templates;

export const promptTemplate = async (): Promise<TemplateKeys> => {
  const answer = await inquirer
    .prompt([
      {
        type: "list",
        name: "templateKey",
        message: "Please select a base template:",
        choices: Object.keys(templates),
      },
    ]);
  return answer.templateKey as TemplateKeys;

}
