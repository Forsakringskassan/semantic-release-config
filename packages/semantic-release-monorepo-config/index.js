const {
    branches,
    releaseRules,
    changelogRules,
} = require("@forsakringskassan/semantic-release-common");

const binPkg = "@forsakringskassan/semantic-release-bin";
const plugin = (name) => require.resolve(`${binPkg}/${name}`);

module.exports = {
    branches,
    plugins: [
        [
            // Analyze and collect information from commits
            plugin("commit-analyzer"),
            {
                config: plugin("conventionalcommits"),
                releaseRules,
            },
        ],

        [
            // Generate a CHANGELOG for the release notes
            plugin("changelog"),
            {
                changelogFile: "CHANGELOG.md",
                changelogTitle: "# CHANGELOG",
            },
        ],

        [
            // Bump version and publish npm packages
            plugin("semantic-release-lerna"),
            {
                generateNotes: true,
                config: plugin("conventionalcommits"),
                presetConfig: {
                    types: changelogRules,
                },
            },
        ],

        [
            // Push new commit for CHANGELOG.md, package.json and package-lock.json
            plugin("git"),
            {
                assets: [
                    "package.json",
                    "package-lock.json",
                    "lerna.json",
                    "CHANGELOG.md",
                    "docs/package.json",
                    "internal/*/package.json",
                    "internal/*/package-lock.json",
                    "packages/*/package.json",
                    "packages/*/package-lock.json",
                ],
                message:
                    "chore(release): ${nextRelease.version} (refs SB-4982)\n\n${nextRelease.notes}",
            },
        ],
    ],
};
