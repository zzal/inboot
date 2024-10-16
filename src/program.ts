import { Command } from '@commander-js/extra-typings';
import { createRequire } from "module";

const packageJson = createRequire(import.meta.url)("../package.json");

export const program = new Command(packageJson.name);

program.version(packageJson.version).description(packageJson.description);
