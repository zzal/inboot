import inquirer from "inquirer";

import { config } from "../config/config-store.js";

export enum TechStack {
  SST = "SST",
  AMPLIFY = "Amplify Gen 2",
}
export const promptTechStack = async (): Promise<TechStack> => {
  const answer = await inquirer
    .prompt([
      {
        type: "list",
        name: "techStack",
        message: "Which framework to use for IaC?",
        choices: [TechStack.SST, TechStack.AMPLIFY],
        default: config.get("techStack"),
      },
    ]);
  return answer.techStack as TechStack;

}
