/* Release notes mapping. Type is commit type and section is heading used in
 * changelog, entries with hidden true is ignored in changelog. */
const changelogRules = [
    { type: "feat", section: "Features" },
    { type: "feature", section: "Features" },
    { type: "fix", scope: "deps", section: "Dependency upgrades" },
    { type: "fix", section: "Bug Fixes" },
    { type: "perf", section: "Performance Improvements" },
    { type: "revert", section: "Reverts" },
    { type: "chore", section: "Miscellaneous Chores", hidden: true },
    { type: "docs", section: "Documentation", hidden: true },
    { type: "style", section: "Styles", hidden: true },
    { type: "refactor", section: "Code Refactoring", hidden: true },
    { type: "test", section: "Tests", hidden: true },
    { type: "build", section: "Build System", hidden: true },
    { type: "ci", section: "Continuous Integration", hidden: true },
];

module.exports = changelogRules;
