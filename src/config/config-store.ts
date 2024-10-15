import Configstore from 'configstore';
import { createRequire } from "module";
const packageJson = createRequire(import.meta.url)("../../package.json");

export const config = new Configstore(packageJson.name);
