#!/usr/bin/env node

import { appendFileSync } from "node:fs";
import { findConfigPreset } from "./preset-utils.mjs";

try {
    const args = process.argv.slice(2);
    const configPresetArg = args.find((arg) =>
        arg.startsWith("--config-preset="),
    );
    const configPreset = configPresetArg
        ? configPresetArg.split("=")[1]
        : undefined;

    const preset = await findConfigPreset({ configPreset });

    console.log(`config-preset=${preset}`);

    const githubOutput = process.env.GITHUB_OUTPUT;
    if (githubOutput) {
        appendFileSync(githubOutput, `config-preset=${preset}\n`, "utf8");
    }

    process.exit(0);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
