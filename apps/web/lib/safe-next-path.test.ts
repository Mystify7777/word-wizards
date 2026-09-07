import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safe-next-path";

describe("safeNextPath", () => {
  const origin = "https://word-wizards.app";

  it("passes through a relative path unchanged", () => {
    expect(safeNextPath("/protected", "/", origin)).toBe("/protected");
  });

  it("falls back on a cross-origin absolute URL", () => {
    expect(safeNextPath("https://evil.com/steal", "/", origin)).toBe("/");
  });

  it("falls back on a non-string value", () => {
    expect(safeNextPath(null, "/", origin)).toBe("/");
    expect(safeNextPath(undefined, "/", origin)).toBe("/");
    expect(safeNextPath(123, "/", origin)).toBe("/");
  });

  it("falls back when path doesn't start with /", () => {
    expect(safeNextPath("evil.com", "/", origin)).toBe("/");
  });

  it("falls back on a malformed path", () => {
    expect(safeNextPath("/%", "/", origin)).toBe("/");
  });

  it("preserves search params and hash on a valid path", () => {
    expect(safeNextPath("/lesson?id=5#top", "/", origin)).toBe("/lesson?id=5#top");
  });
});
