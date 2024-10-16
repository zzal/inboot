import { spawn } from 'node:child_process';
import { spinner } from "./prompts/spinner.js";
import chalk from "chalk";

export const execute= (cmd: string, args: string[]) => {
  const child = spawn(cmd, args);
  child.stdout.setEncoding('utf8');

  spinner.succeed(`${chalk.greenBright(cmd)} ${chalk.green(args.join(" "))}`);

  child.stdout.on('data', (data) => {
    console.log(data.toString().replace(/\n$/, ""));
  });

  child.stdout.on('message', (message) => {
    console.log(message.toString().replace(/\n$/, ""));
  });

  child.stderr.on('data', (data) => {
    console.log(data.toString().replace(/\n$/, ""));
  });

  child.on('close', (code) => {
    if (code == null) {
      process.exit(1);
    } else  if (code > 0) {
      console.log(`child process exited with code ${code}`);
      process.exit(code);
    }
  });
}
