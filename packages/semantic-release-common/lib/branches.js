module.exports = [
    /* regular releases */
    { name: "master", channel: "latest", prerelease: false },
    { name: "main", channel: "latest", prerelease: false },
    { name: "dev", channel: "latest", prerelease: false },

    /* maintenance releases, e.g. release/4.x */
    {
        name: "release/+([0-9])?(.{+([0-9]),x}).x",
        range: "${name.replace(/^release\\//g, '')}",
        channel: "${name.replace(/^release\\//g, '')}",
        prerelease: false
    },

    /* beta releases */
    { name: "beta", prerelease: true },
];
