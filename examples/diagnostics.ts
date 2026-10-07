// Intentional problems for previewing error, deprecation, and unused styling.

/** @deprecated Use `describeColor` instead. */
function describe(hex: string): string {
  return `Color ${hex}`;
}

function describeColor(hex: string): string {
  const unused = hex.length;
  return `Color ${hex}`;
}

const count: number = "three";
console.log(describe("#2d6a3b"), describeColor("#3d5f7a"), count);
