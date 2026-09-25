import { rmSync } from "node:fs";

// A deleted source page must not remain in the next S3 sync.
rmSync("_site", { recursive: true, force: true });
