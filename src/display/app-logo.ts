import chalk from "chalk";
import figlet from "figlet";

export const displayAppLogo = () => {
  console.log("")
  console.log(
    chalk.cyan(figlet.textSync(" ingeno Boot", { font: "ANSI Shadow" }))
  );
};
