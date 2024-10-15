import inquirer from "inquirer";

import users, { type AwsUser } from "../config/aws.js"
import { config } from "../config/config-store.js";

export const promptAwsUser = async (): Promise<AwsUser | null> => {
  const answer = await inquirer
    .prompt([
      {
        type: "list",
        name: "awsUserId",
        message: "Which existing AWS credential to use?",
        choices: Array.from(users.keys()),
        default: config.get("awsUserId"),
      },
    ]);
    const user = users.get(answer.awsUserId);
    if (user != null) {
      config.set("awsUser", answer.awsUserId);
      return user;
    }

    return null;
}
