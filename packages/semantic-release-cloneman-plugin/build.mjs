import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    external: ["cloneman"],
    outfile: "dist/index.js",
});
