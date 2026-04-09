import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { appendToken } from "./append-token.ts";

describe("appendToken", () => {
    it("should return a nerf-darted registry URL with the auth token", () => {
        assert.equal(
            appendToken("https://registry.npmjs.org/", "my-secret-token"),
            "//registry.npmjs.org/:_authToken=my-secret-token",
        );
    });
});
