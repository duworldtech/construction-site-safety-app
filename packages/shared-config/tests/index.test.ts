import { test, strict as assert } from "node:test";
import { loadConfig, isMock, isLive } from "../src/index.js";

test("loadConfig defaults and validation", () => {
  const orig = process.env;
  process.env = { ...orig };
  delete process.env.MODE;
  delete process.env.APP_PORT;
  const cfg = loadConfig();
  assert.equal(cfg.MODE, "mock");
  assert.equal(cfg.APP_PORT, 3000);
  assert.equal(isMock(), true);
  assert.equal(isLive(), false);
  process.env = orig;
});