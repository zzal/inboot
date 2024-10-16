import { spawn } from 'node:child_process';

export const execute = (cmd: string, args: string[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    process.on("SIGABRT", signal => {
      child.kill(signal);
      reject("Aborted.");
    });

    child.addListener("close", (code) => resolve(code === 0));
    child.addListener("error", (error) => reject(error));
  });
}
