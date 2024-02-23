module.exports = {
    git: require("@semantic-release/git"),
    npm: require("@semantic-release/npm"),
    changelog: require("@semantic-release/changelog"),
    commitAnalyzer: require("@semantic-release/commit-analyzer"),
    conventionalcommits: require("conventional-changelog-conventionalcommits"),
    releaseNotesGenerator: require("@semantic-release/release-notes-generator"),
    semanticReleaseLerna: require("semantic-release-lerna"),
};
