import { spinner } from "./spinner.js";
import chalk from "chalk";

export const printFeedbackInfo = (label: string, value: string, isWarn = false) => {
  const toWrite = `${chalk.dim(label)} ${chalk.whiteBright(value)}`
  isWarn ? spinner.warn(toWrite) : spinner.info(toWrite);
  console.log("");
}


export const printProcessStart = (projectName: string, templateKey: string, techStack: string) => {
  const getTuple = (label: string, value: string) => `${label} ${chalk.cyan(chalk.inverse(` ${value} `))}`;

  spinner.start(`${getTuple("Creating", projectName)} ${getTuple("using template", templateKey)} ${getTuple("via", techStack)}`);
}
