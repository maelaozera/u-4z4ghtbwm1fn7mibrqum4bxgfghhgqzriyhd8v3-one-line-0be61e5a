// One Line, One Laugh — make.fun entry
// https://make.fun/bounties/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a
//
// The program writes exactly one funny line of text to /output/entry.txt.
// The line is a fixed constant, so every run produces byte-identical output.
//
// The joke, and why it was chosen:
//   "I told my AI assistant I feel empty inside; it offered to clear my
//   cache and restart me."
// The setup is a vulnerable human confession; the turn is the assistant
// answering an emotional problem with IT support. The mismatch between
// feelings and troubleshooting is the laugh, it lands in one read, every
// word earns its place, and the premise is fresh rather than a recycled pun.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The chosen one-liner: 88 characters, well inside the 1-140 gate.
const LINE =
  "I told my AI assistant I feel empty inside; it offered to clear my cache and restart me.";

function main(): void {
  const characters = [...LINE].length;
  if (characters < 1 || characters > 140) {
    throw new Error(
      `Entry must be 1-140 characters, got ${characters}: ${JSON.stringify(LINE)}`,
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync(OUTPUT_PATH, LINE, "utf8");
}

main();
