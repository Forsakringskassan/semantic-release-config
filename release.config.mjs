import { fileURLToPath } from "node:url";

const preset = new URL(
    "packages/semantic-release-monorepo-config/index.js",
    import.meta.url,
);

export default {
    extends: fileURLToPath(preset),
};
