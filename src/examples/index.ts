import { TechStack } from "../prompts/prompt-tech-stack.js";
import { genericHandle } from '../handlers/generic-handle.js'
import { handleImageCat } from './images-cat.js'

export const GITHUB_REPO = 'https://github.com/zzal/inboot/tree/main';

export type TemplateConfig = {
  exampleUrl: string;
  handle?: (templateKey: string, projectName: string, techStack?: TechStack) => AsyncGenerator<boolean>;
}

export const templates: Record<string, TemplateConfig> = {
  'NextJS: app-dir-i18n-routing': {
    exampleUrl: "app-dir-i18n-routing",
    handle: genericHandle,
  },
  'NextJS: with-typescript-types': {
    exampleUrl: "with-typescript-types",
    handle: genericHandle,
  },
  'Internal: Images Catalog': {
    exampleUrl: `${GITHUB_REPO}/templates/images-cat`,
    handle: handleImageCat,
  },
};
