import { test, strict as assert } from "node:test";
import { hash, hmacSign, hmacVerify, randomHex } from "../src/index.js";

test("hash produces deterministic sha256", () => {
  const a = hash("hello");
  const b = hash("hello");
  assert.equal(a, b);
  assert.match(a, /^[a-f0-9]{64}$/);
});

test("hmac sign/verify roundtrip", () => {
  const secret = "super-secret";
  const msg = "payload";
  const sig = hmacSign(msg, secret);
  assert.equal(hmacVerify(msg, secret, sig), true);
  assert.equal(hmacVerify("tampered", secret, sig), false);
});

test("randomHex length", () => {
  const r = randomHex(16);
  assert.equal(r.length, 32);
});