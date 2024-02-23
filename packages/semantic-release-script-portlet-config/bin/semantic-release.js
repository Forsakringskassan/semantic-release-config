#!/usr/bin/env node

const path = require("path");
const { spawn } = require("child_process");

const pkgPath = path.dirname(require.resolve("semantic-release/package.json"));
const binary = path.join(pkgPath, "bin/semantic-release.js");

spawn("node", [binary, ...process.argv.slice(2)], {
    stdio: "inherit",
}).on("exit", (code) => {
    process.exit(code);
});
