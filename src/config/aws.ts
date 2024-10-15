import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import ini from "ini";

import { program } from "../program.js"

export type AwsUser = { accessKeyId: string }

let users: Map<string, AwsUser> = new Map();

const fileName = path.resolve(os.homedir(), ".aws/credentials");

try {
  fs.accessSync(fileName, fs.constants.R_OK);
} catch (err) {
  program.error(String(err));
}

try {
  const file = fs.readFileSync(fileName, 'utf8');
  const awsCredentials = ini.parse(file);
  const entries = Object.entries(awsCredentials).map<[string, AwsUser]>(([key, info]) => ([key, { accessKeyId: info?.aws_access_key_id ?? null }]));
  users = new Map(entries.filter(([_, info]) => info != null));
} catch (err) {
  program.error(String(err));
}

export default users;
