import { randomBytes } from "node:crypto";
import { mkdirSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const tempdir = realpathSync(os.tmpdir());

function temporaryDirectory(): string {
    const testPath = path.join(tempdir, randomBytes(16).toString("hex"));
    mkdirSync(testPath);
    return testPath;
}

/**
 * Creates a new file with the given filename inside a temporary directory.
 * @param filename - The name of the file to create.
 * @returns The absolute path to the created file.
 */
export function temporaryFile(filename: string): string {
    const dir = temporaryDirectory();
    const filePath = path.join(dir, filename);
    writeFileSync(filePath, "");
    return filePath;
}
