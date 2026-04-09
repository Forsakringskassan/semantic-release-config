import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { toNerfDart } from "./nerf-dart.ts";

describe("toNerfDart", () => {
    it("should return protocol-less base URL for a simple registry URL", () => {
        assert.equal(
            toNerfDart("https://registry.npmjs.org/"),
            "//registry.npmjs.org/",
        );
    });

    it("should strip username and password", () => {
        assert.equal(
            toNerfDart("https://user:secret@registry.npmjs.org/"),
            "//registry.npmjs.org/",
        );
    });

    it("should strip query parameters", () => {
        assert.equal(
            toNerfDart("https://registry.npmjs.org/?foo=bar"),
            "//registry.npmjs.org/",
        );
    });

    it("should strip hash fragment", () => {
        assert.equal(
            toNerfDart("https://registry.npmjs.org/#section"),
            "//registry.npmjs.org/",
        );
    });

    it("should truncate path to the last slash when path does not end with slash", () => {
        assert.equal(
            toNerfDart("https://registry.npmjs.org/my-package"),
            "//registry.npmjs.org/",
        );
    });

    it("should truncate to parent path segment when nested path does not end with slash", () => {
        assert.equal(
            toNerfDart("https://registry.npmjs.org/scope/package"),
            "//registry.npmjs.org/scope/",
        );
    });

    it("should preserve trailing slash in path", () => {
        assert.equal(
            toNerfDart("https://registry.npmjs.org/scope/"),
            "//registry.npmjs.org/scope/",
        );
    });

    it("should include port number in the host", () => {
        assert.equal(
            toNerfDart("https://registry.example.com:8080/"),
            "//registry.example.com:8080/",
        );
    });

    it("should work with http protocol", () => {
        assert.equal(
            toNerfDart("http://registry.example.com/"),
            "//registry.example.com/",
        );
    });
});
