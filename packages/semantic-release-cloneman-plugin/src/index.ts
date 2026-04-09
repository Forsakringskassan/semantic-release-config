import fs from "node:fs/promises";
import path from "node:path";
import { pack, prepare, publish as clonemanPublish } from "cloneman";
import type {
    Config,
    PublishContext,
    VerifyConditionsContext,
} from "semantic-release";

import { appendToken } from "./utils/append-token";

import { temporaryFile } from "./utils/temporary-directory";

const TEMPLATE_BUILD_PATH = "./temp/cloneman";

const tmpNpmrcPath = temporaryFile(".npmrc");

export async function verifyConditions(
    pluginConfig: Config,
    context: VerifyConditionsContext,
): Promise<void> {
    const cwd = context.cwd ?? process.cwd();
    const targetDir = path.join(cwd, TEMPLATE_BUILD_PATH);
    await prepare(cwd, targetDir);
    await pack({ cwd, targetDir });
}

export async function publish(
    pluginConfig: Config,
    context: PublishContext,
): Promise<void> {
    const cwd = context.cwd ?? process.cwd();
    const targetDir = path.join(cwd, TEMPLATE_BUILD_PATH);

    const registry =
        context.env.NPM_REGISTRY_URL || "https://registry.npmjs.org/";
    const token = context.env.NPM_TOKEN;

    if (token) {
        const authTokenLine = appendToken(registry, token);
        await fs.appendFile(tmpNpmrcPath, authTokenLine);
    }

    await prepare(cwd, targetDir);
    await clonemanPublish({ cwd: targetDir, npmRcPath: tmpNpmrcPath });
}
