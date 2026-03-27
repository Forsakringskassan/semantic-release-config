declare module "@semantic-release/npm" {
    import type { Config, VerifyConditionsContext } from "semantic-release";

    export function verifyConditions(
        pluginConfig: Config,
        context: VerifyConditionsContext,
    ): Promise<void>;
}
