module.exports = [
    /* regular releases */
    { name: "master", channel: "latest" },
    { name: "main", channel: "latest" },
    { name: "dev", channel: "latest" },

    /* maintenance releases, e.g. release/4.x */
    {
        name: "release/+([0-9])?(.{+([0-9]),x}).x",
        range: "${name.replace(/^release\\//g, '')}",
        channel: "${name.replace(/^release\\//g, '')}",
    },

    /* beta releases */
    { name: "beta", prerelease: true },
];
