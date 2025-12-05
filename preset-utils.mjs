import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * @returns {Error} Error with detailed message
 */
function createNotFoundError() {
    const error = new Error(
        `Configuration preset could not be found.\n\n` +
            `Please either:\n` +
            `- Add 'release.extends' to your package.json\n` +
            `- Create a release.config.{mjs,cjs,js} file with an 'extends' property\n` +
            `- Specify the preset using the 'config-preset' input in your GitHub Actions workflow`,
    );
    error.code = "ERR_NO_PRESET";
    return error;
}

/**
 * @param {string} configFile - Config file name
 * @returns {Error} Error with message about missing extends property
 */
function createMissingExtendsError(configFile) {
    const error = new Error(
        `Configuration preset could not be found. The file '${configFile}' exists but does not contain an 'extends' property in its default export.\n\n` +
            `Please either:\n` +
            `- Add 'extends' to your ${configFile} default export\n` +
            `- Specify the preset using the 'config-preset' input in your GitHub Actions workflow`,
    );
    error.code = "ERR_NO_EXTENDS";
    return error;
}

/**
 * @param {string} cwd - Working directory
 * @param {Function} importModule - Module import function
 * @param {object} fs - File system interface with access and readFile methods
 * @returns {Promise<string|null>} Preset name or null if not found
 */
async function checkReleaseConfigFiles(cwd, importModule, fs) {
    const configFiles = [
        "release.config.mjs",
        "release.config.cjs",
        "release.config.js",
    ];

    for (const configFile of configFiles) {
        const configPath = resolve(cwd, configFile);

        try {
            await fs.access(configPath);
            const fileUrl = pathToFileURL(configPath).href;
            const config = await importModule(fileUrl);
            const preset = config?.default?.extends;

            if (!preset) {
                throw createMissingExtendsError(configFile);
            }

            return preset;
        } catch (error) {
            if (error.code === "ENOENT") {
                continue;
            }
            throw error;
        }
    }

    return null;
}

/**
 * Finds the configuration preset from release.config files or package.json.
 *
 * @param {object} options - Configuration options
 * @param {string} [options.configPreset] - Explicit preset to use (overrides detection)
 * @param {string} [options.cwd=process.cwd()] - Working directory to search for configuration
 * @param {Function} [options.importModule] - Function to import modules (for testing)
 * @param {object} [options.fs] - File system interface with access and readFile methods (for testing)
 * @returns {Promise<string>} The configuration preset name
 * @throws {Error} If configuration preset cannot be found
 */
export async function findConfigPreset(options = {}) {
    const {
        configPreset,
        cwd = process.cwd(),
        importModule = async (path) => import(path),
        fs = { access, readFile },
    } = options;

    if (configPreset && configPreset.trim()) {
        return configPreset;
    }

    const configPresetFromFile = await checkReleaseConfigFiles(
        cwd,
        importModule,
        fs,
    );

    if (configPresetFromFile) {
        return configPresetFromFile;
    }

    const packageJsonPath = resolve(cwd, "package.json");

    try {
        const content = await fs.readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(content);
        const preset = packageJson?.release?.extends;

        if (!preset) {
            throw createNotFoundError();
        }

        return preset;
    } catch (error) {
        if (error.code === "ERR_NO_PRESET") {
            throw error;
        }
        throw createNotFoundError();
    }
}
