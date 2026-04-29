import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { pack, prepare, publish as clonemanPublish } from "cloneman";
import ini from "ini";
import registryAuthToken from "registry-auth-token";
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
    const { cwd = process.cwd(), env, logger } = context;
    const targetDir = path.join(cwd, TEMPLATE_BUILD_PATH);

    const registry = env.NPM_REGISTRY_URL ?? "https://registry.npmjs.org/";

    const localNpmrcPath = path.join(cwd, ".npmrc");
    let authFound = false;
    if (existsSync(localNpmrcPath)) {
        logger.log("Reading local .npmrc configuration");
        const npmrcString = await fs.readFile(localNpmrcPath, "utf8");
        const npmrc: Record<string, string> = ini.parse(npmrcString);

        if (registryAuthToken(registry, { npmrc })) {
            logger.log("Using token from .npmrc for authentication");
            const localNpmrcContent = npmrcString;
            await fs.appendFile(tmpNpmrcPath, localNpmrcContent);
            authFound = true;
        }
    }

    if (!authFound) {
        logger.log(
            "Checking for NPM_TOKEN in environment variables for authentication",
        );
        const token = env.NPM_TOKEN;

        if (token) {
            logger.log("Appending environment token to temporary .npmrc");
            const authTokenLine = appendToken(registry, token);
            await fs.appendFile(tmpNpmrcPath, authTokenLine);
        }
    }

    await prepare(cwd, targetDir);
    await clonemanPublish({ cwd: targetDir, npmRcPath: tmpNpmrcPath });
}
