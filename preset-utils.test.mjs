import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { vol } from "memfs";
import { findConfigPreset } from "./preset-utils.mjs";

function createImportMock() {
    return async (fileUrl) => {
        const filePath = fileURLToPath(fileUrl);
        const normalizedPath = filePath.replace(/^[A-Z]:/i, "");

        try {
            const content = await vol.promises.readFile(normalizedPath, "utf8");

            if (normalizedPath.endsWith(".mjs")) {
                const context = vm.createContext({});
                const m = new vm.SourceTextModule(content, {
                    context,
                    identifier: fileUrl,
                });
                await m.link(() => {
                    throw new Error("No nested imports expected");
                });
                await m.evaluate();
                return m.namespace;
            } else if (
                normalizedPath.endsWith(".cjs") ||
                normalizedPath.endsWith(".js")
            ) {
                const context = vm.createContext({
                    exports: {},
                    module: { exports: {} },
                });
                vm.runInContext(content, context);
                return { default: context.module.exports };
            }

            throw new Error(`Unsupported file type: ${normalizedPath}`);
        } catch (error) {
            if (error.code === "ENOENT") {
                throw error;
            }
            if (error.syscall === "read") {
                throw error;
            }
            const enoent = new Error("ENOENT");
            enoent.code = "ENOENT";
            throw enoent;
        }
    };
}

describe("findConfigPreset", () => {
    const mockImport = createImportMock();

    beforeEach(() => {
        vol.reset();
    });

    describe("with explicit config-preset", () => {
        it("should return the explicit preset when provided", async () => {
            // Given: An explicit config preset is provided
            // When: findConfigPreset is called with the preset
            const result = await findConfigPreset({
                configPreset: "@custom/preset",
            });

            // Then: The explicit preset is returned
            assert.equal(result, "@custom/preset");
        });

        it("should prioritize explicit preset over release.config files", async () => {
            // Given: A release.config.mjs file exists with a preset
            vol.fromJSON({
                "/test/release.config.mjs": `export default { extends: "@forsakringskassan/semantic-release-config" };`,
            });

            // When: findConfigPreset is called with an explicit override preset
            const result = await findConfigPreset({
                configPreset: "@override/preset",
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The explicit preset overrides the file-based preset
            assert.equal(result, "@override/preset");
        });
    });

    describe("with release.config files", () => {
        it("should detect preset from release.config.mjs", async () => {
            // Given: A release.config.mjs file with an extends property
            vol.fromJSON({
                "/test/release.config.mjs": `export default { extends: "@forsakringskassan/semantic-release-config" };`,
            });

            // When: findConfigPreset is called without explicit preset
            const result = await findConfigPreset({
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The preset from release.config.mjs is returned
            assert.equal(result, "@forsakringskassan/semantic-release-config");
        });

        it("should detect preset from release.config.cjs", async () => {
            // Given: A release.config.cjs file with an extends property
            vol.fromJSON({
                "/test/release.config.cjs": `module.exports = { extends: "@forsakringskassan/semantic-release-monorepo-config" };`,
            });

            // When: findConfigPreset is called without explicit preset
            const result = await findConfigPreset({
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The preset from release.config.cjs is returned
            assert.equal(
                result,
                "@forsakringskassan/semantic-release-monorepo-config",
            );
        });

        it("should detect preset from release.config.js", async () => {
            // Given: A release.config.js file with an extends property
            vol.fromJSON({
                "/test/release.config.js": `module.exports = { extends: "@custom/preset" };`,
            });

            // When: findConfigPreset is called without explicit preset
            const result = await findConfigPreset({
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The preset from release.config.js is returned
            assert.equal(result, "@custom/preset");
        });

        it("should throw error when release.config exists but extends is missing", async () => {
            // Given: A release.config.mjs file without an extends property
            vol.fromJSON({
                "/test/release.config.mjs": `export default { branches: ["main"] };`,
            });

            // When: findConfigPreset is called
            // Then: An error is thrown indicating the extends property is missing
            await assert.rejects(
                findConfigPreset({
                    cwd: "/test",
                    importModule: mockImport,
                    fs: vol.promises,
                }),
                {
                    message:
                        /Configuration preset could not be found.*release\.config\.mjs.*exists but does not contain an 'extends' property/s,
                },
            );
        });
    });

    describe("with package.json", () => {
        it("should detect preset from package.json when no release.config files exist", async () => {
            // Given: No release.config files exist, but package.json has release.extends
            vol.fromJSON({
                "/test/package.json": JSON.stringify({
                    name: "test-package",
                    release: {
                        extends: "@forsakringskassan/semantic-release-config",
                    },
                }),
            });

            // When: findConfigPreset is called without explicit preset
            const result = await findConfigPreset({
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The preset from package.json is returned
            assert.equal(result, "@forsakringskassan/semantic-release-config");
        });

        it("should work with custom preset names", async () => {
            // Given: package.json has a custom preset in release.extends
            vol.fromJSON({
                "/test/package.json": JSON.stringify({
                    release: {
                        extends: "@custom-org/custom-config",
                    },
                }),
            });

            // When: findConfigPreset is called without explicit preset
            const result = await findConfigPreset({
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The custom preset from package.json is returned
            assert.equal(result, "@custom-org/custom-config");
        });
    });

    describe("error handling", () => {
        it("should throw detailed error when no configuration found", async () => {
            // Given: package.json exists but has no release.extends property
            vol.fromJSON({
                "/test/package.json": JSON.stringify({ name: "test" }),
            });

            // When: findConfigPreset is called
            // Then: A detailed error is thrown with helpful information
            await assert.rejects(
                findConfigPreset({
                    cwd: "/test",
                    importModule: mockImport,
                    fs: vol.promises,
                }),
                (error) => {
                    assert.match(
                        error.message,
                        /Configuration preset could not be found/,
                    );
                    assert.match(error.message, /package\.json/);
                    assert.match(error.message, /release\.config/);
                    assert.match(error.message, /config-preset.*input/);
                    return true;
                },
            );
        });

        it("should not include checked locations in error message", async () => {
            // Given: package.json exists but has no release.extends property
            vol.fromJSON({
                "/test/package.json": JSON.stringify({ name: "test" }),
            });

            // When: findConfigPreset is called
            // Then: The error message does not include "Checked locations"
            try {
                await findConfigPreset({
                    cwd: "/test",
                    importModule: mockImport,
                    fs: vol.promises,
                });
                assert.fail("Should have thrown an error");
            } catch (error) {
                assert.doesNotMatch(error.message, /Checked locations/);
            }
        });
    });

    describe("edge cases", () => {
        it("should handle empty string config-preset as falsy", async () => {
            // Given: An empty string is passed as config preset and a release.config.mjs exists
            vol.fromJSON({
                "/test/release.config.mjs": `export default { extends: "@forsakringskassan/semantic-release-config" };`,
            });

            // When: findConfigPreset is called with empty string preset
            const result = await findConfigPreset({
                configPreset: "",
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The preset from release.config.mjs is returned (empty string treated as falsy)
            assert.equal(result, "@forsakringskassan/semantic-release-config");
        });

        it("should handle whitespace-only config-preset as falsy", async () => {
            // Given: A whitespace-only string is passed as config preset and a release.config.mjs exists
            vol.fromJSON({
                "/test/release.config.mjs": `export default { extends: "@forsakringskassan/semantic-release-config" };`,
            });

            // When: findConfigPreset is called with whitespace-only preset
            const result = await findConfigPreset({
                configPreset: "   ",
                cwd: "/test",
                importModule: mockImport,
                fs: vol.promises,
            });

            // Then: The preset from release.config.mjs is returned (whitespace treated as falsy)
            assert.equal(result, "@forsakringskassan/semantic-release-config");
        });
    });
});
