import { createHmac, randomBytes, timingSafeEqual, createHash } from "crypto";

export type HashAlgorithm = "sha256" | "sha512";

export function hash(input: string | Buffer, alg: HashAlgorithm = "sha256"): string {
  const h = createHash(alg);
  h.update(input);
  return h.digest("hex");
}

export function hmacSign(message: string | Buffer, secret: string | Buffer, alg: HashAlgorithm = "sha256"): string {
  const hmac = createHmac(alg, secret);
  hmac.update(message);
  return hmac.digest("hex");
}

export function hmacVerify(message: string | Buffer, secret: string | Buffer, signatureHex: string, alg: HashAlgorithm = "sha256"): boolean {
  const computed = Buffer.from(hmacSign(message, secret, alg), "hex");
  const provided = Buffer.from(signatureHex, "hex");
  if (computed.length !== provided.length) return false;
  return timingSafeEqual(computed, provided);
}

export function randomHex(bytes = 32): string {
  return randomBytes(bytes).toString("hex");
}