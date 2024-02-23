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
            // Generate release notes from the analyzed commits
            plugin("release-notes-generator"),
            {
                config: plugin("conventionalcommits"),
            },
        ],

        [
            // Generate a CHANGELOG for the release notes
            plugin("changelog"),
            {
                changelogFile: "CHANGELOG.md",
                changelogTitle: "# CHANGELOG",
                presetConfig: {
                    types: changelogRules,
                },
            },
        ],

        [
            // Update package.json version and publish npm package
            plugin("npm"),
        ],

        [
            // Push new commit for CHANGELOG.md, package.json and package-lock.json
            plugin("git"),
            {
                assets: ["package.json", "package-lock.json", "CHANGELOG.md"],
                message:
                    "chore(release): ${nextRelease.version} (refs SB-4982)\n\n${nextRelease.notes}",
            },
        ],
    ],
};
