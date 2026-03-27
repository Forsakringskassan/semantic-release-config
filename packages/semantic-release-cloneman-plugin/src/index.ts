import { verifyConditions as verifyConditionsNPM } from "@semantic-release/npm";

import spawn from "nano-spawn";
import type {
    Config,
    PublishContext,
    VerifyConditionsContext,
} from "semantic-release";

export async function verifyConditions(
    pluginConfig: Config,
    context: VerifyConditionsContext,
): Promise<void> {
    await verifyConditionsNPM(pluginConfig, context);
    await spawn("cloneman", ["pack"], {
        cwd: context.cwd,
    });
}

export async function publish(
    pluginConfig: Config,
    context: PublishContext,
): Promise<void> {
    await spawn("cloneman", ["publish"], {
        cwd: context.cwd,
    });
}
