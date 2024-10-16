import { spawn } from 'node:child_process';
import { spinner } from "./prompts/spinner.js";
import chalk from "chalk";

export const execute= (cmd: string, args: string[]) => {
  const ls = spawn(cmd, args);
  console.debug(cmd, args.join(" "))

  ls.stdout.on('data', (data) => {
    console.log(JSON.stringify(data));
    spinner.text = `stdout: ${data}`;
  });

  ls.stderr.on('data', (data) => {
    console.log(JSON.stringify(data));
    spinner.text = `stdout: ${data}`;
    spinner.fail();
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
