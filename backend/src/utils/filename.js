import crypto from "crypto";
import path from "path";

export function makeSafeName(originalName, prefix = "file") {
  const ext = path.extname(originalName || "").toLowerCase();
  const base = path.basename(originalName || "", ext)
    .toString()
    .normalize("NFKD")
    .replace(/[^\w\-]+/g, "_")
    .slice(0, 50) || prefix;

  const rand = crypto.randomBytes(5).toString("hex");
  const stamp = Date.now();
  return `${base}__${rand}_${stamp}${ext}`;
}
