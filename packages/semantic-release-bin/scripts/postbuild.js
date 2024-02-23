const { promises: fs } = require("fs");
const path = require("path");

const pkgIndex = require.resolve("conventional-changelog-conventionalcommits");
const presetRoot = path.dirname(pkgIndex);

const rel = (filePath) => path.relative(path.join(__dirname, ".."), filePath);

async function run() {
    const src = path.join(presetRoot, "templates");
    const dst = path.join(__dirname, "..", "dist/templates");
    console.log(`  Copying "${rel(src)}" -> "${rel(dst)}"`);
    await fs.cp(src, dst, {
        recursive: true,
    });
}

run().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
