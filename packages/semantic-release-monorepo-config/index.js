const {
    branches,
    releaseRules,
    changelogRules,
} = require("@forsakringskassan/semantic-release-common");

const isGithub = Boolean(process.env.GITHUB_ACTION);

module.exports = {
    branches,
    plugins: [
        [
            // Analyze and collect information from commits
            "@semantic-release/commit-analyzer",
            {
                config: "conventional-changelog-conventionalcommits",
                releaseRules,
            },
        ],

        [
            // Generate a CHANGELOG for the release notes
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
                changelogTitle: "# CHANGELOG",
            },
        ],

        [
            // Bump version and publish npm packages
            "semantic-release-lerna",
            {
                generateNotes: true,
                config: "conventional-changelog-conventionalcommits",
                presetConfig: {
                    types: changelogRules,
                },
            },
        ],

        [
            // Push new commit for CHANGELOG.md, package.json and package-lock.json
            "@semantic-release/git",
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
                    "examples/*/package.json",
                    "examples/*/package-lock.json",
                    "preview/package.json",
                    "publiccode.yml",
                ],
                message:
                    "chore(release): ${nextRelease.version} (refs SB-4982)\n\n${nextRelease.notes}",
            },
        ],

        isGithub
            ? [
                  // Create release page and add comments/labels to merged pull requests and resolved issues
                  "@semantic-release/github",
              ]
            : null,
    ].filter(Boolean),
};
