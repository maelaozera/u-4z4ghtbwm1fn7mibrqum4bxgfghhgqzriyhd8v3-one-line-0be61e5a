// One Line, One Laugh — make.fun entry
// https://make.fun/bounties/u-4z4ghtbwm1fn7mibrqum4bxgfghhgqzriyhd8v3-one-line-0be61e5a
//
// The program writes exactly one funny line of text to /output/entry.txt.
// The line is a fixed constant, so every run produces byte-identical output.
//
// The joke, and why this text was chosen:
//   "I told my AI assistant I feel empty inside; it offered to clear my
//   cache and restart me."
// The setup is a vulnerable human confession ("I feel empty inside"); the
// turn is the assistant answering an emotional problem with IT support
// ("clear my cache and restart me"). That mismatch — feelings met with
// troubleshooting — is the laugh. It lands in one read, every word earns
// its place, and the premise is fresh rather than a recycled pun.
//
// The gate the sealed scorer applies (see competition.yaml): the file must
// be UTF-8 text of 1 to 140 characters and not only white space. The
// validation below mirrors that gate so a bad line fails loudly here
// instead of silently scoring zero on the server.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The gate limits from the competition rules.
const MIN_LENGTH = 1;
const MAX_LENGTH = 140;

// The chosen one-liner: 88 characters, well inside the 1-140 gate.
// Kept as a single constant so the output can never drift between runs.
const LINE =
  "I told my AI assistant I feel empty inside; it offered to clear my cache and restart me.";

// Default output location required by the harness. For local testing the
// directory can be overridden with MAKEFUN_OUTPUT_DIR (the file name stays
// entry.txt), so the program can be exercised without touching /output.
const OUTPUT_FILE = "entry.txt";

function resolveOutputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  if (dir) {
    return join(dir, OUTPUT_FILE);
  }
  return join("/output", OUTPUT_FILE);
}

// Mirror the sealed scorer's gate: 1-140 characters, not only white space,
// and a single line (the entry is one line of text, not a paragraph).
function validateLine(line: string): void {
  const characters = [...line].length;
  if (characters < MIN_LENGTH || characters > MAX_LENGTH) {
    throw new Error(
      `Entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${characters}: ${JSON.stringify(line)}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line of text");
  }
}

function writeEntry(outputPath: string, line: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync(outputPath, line, "utf8");
}

function main(): void {
  try {
    validateLine(LINE);
    const outputPath = resolveOutputPath();
    writeEntry(outputPath, LINE);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to write entry: ${message}`);
    process.exit(1);
  }
}

main();
