import { spawn } from 'node:child_process';
import { spinner } from "./prompts/spinner.js";
import chalk from "chalk";

export const execute= (cmd: string, args: string[]) => {
  const ls = spawn(cmd, args);
  console.log("");
  console.log(cmd, args.join(" "));

  ls.stdout.on('data', (data) => {
    // console.log(JSON.stringify(data));
    spinner.text = `stdout: ${data}`;
  });
  ls.stdout.on('error', (data) => {
    // console.log(JSON.stringify(data));
    spinner.text = `stdout: ${data}`;
  });

  ls.stderr.on('data', (data) => {
    spinner.text = `stderr: ${data}`;
    spinner.fail("error");
  });

  ls.on('close', (code) => {
    if (code === 0) {
      spinner.succeed(chalk.green("Done!"));
      process.exit(0);
    } else {
      console.log(`child process exited with code ${code}`);
      process.exit(code);
    }
  });
}
