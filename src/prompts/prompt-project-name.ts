import fs from "node:fs";
import path from "node:path";
import slug from 'limax';
import inquirer from "inquirer";

import { config } from "../config/config-store.js";
import { program } from "../program.js";

export const promptProjectName = async (providedName?: string): Promise<string> => {
  const folderName = slug(path.basename(fs.realpathSync(".")), '-');
  const answer = await inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "Project name?",
        default: slug(providedName ?? folderName, "-"),
      },
    ]);

  const name = slug(answer.projectName ?? folderName, "-");
  if (/^\d/.test(name)) {
    program.error("Project names must not starts with a number");
  }
  if (name.length < 3) {
    program.error("Project names must be at least 3 characters");
  }
  if (name.length > 150) {
    program.error("Project names must be at least 3 characters");
  }
  config.set("projectName", name);
  return name;
}
