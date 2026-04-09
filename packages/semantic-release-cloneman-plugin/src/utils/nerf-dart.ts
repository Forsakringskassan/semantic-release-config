/**
 * Converts a URI into a "nerf dart" — a protocol-less base URL string
 * that includes only the host and path (up to the last slash), with
 * credentials, query parameters, and hash fragments removed.
 * Example:
 * https://registry.npmjs.org/ generates //registry.npmjs.org/
 */
export function toNerfDart(uri: string): string {
    const parsed = new URL(uri);
    parsed.username = "";
    parsed.password = "";
    parsed.search = "";
    parsed.hash = "";

    if (!parsed.pathname.endsWith("/")) {
        parsed.pathname = parsed.pathname.slice(
            0,
            parsed.pathname.lastIndexOf("/") + 1,
        );
    }

    return `//${parsed.host}${parsed.pathname}`;
}
