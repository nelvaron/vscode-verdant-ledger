// The Verdant Ledger Light palette. The validator accepts only these colors,
// their translucent forms (#rrggbbaa) for palette colors, and the derived
// tints below. Keep this file in step with the tables in DESIGN.md; the
// website reads names and roles from here.

export const palette = {
  "#1b2320": { name: "Deep evergreen", role: "Text, variables, functions" },
  "#5d6864": { name: "Evergreen gray", role: "Parameters, keys, operators, secondary text" },
  "#66716d": { name: "Muted gray-green", role: "Comments, punctuation, line numbers" },
  "#2d6a3b": { name: "Forest green", role: "Accent, strings, markup tags, success" },
  "#8a6408": { name: "Accessible ochre", role: "Keywords, numbers, attributes, warnings" },
  "#b8860b": { name: "Warm ochre", role: "Modified-file marks, warning badges, find outline" },
  "#3d5f7a": { name: "Slate blue", role: "Types, classes, interfaces, information" },
  "#2f6b6b": { name: "Muted teal", role: "Second bracket level, terminal cyan" },
  "#7a4a6e": { name: "Plum", role: "Third bracket level, terminal magenta" },
  "#8a2621": { name: "Deep brick red", role: "Errors, deletions, failures" },
  "#cfd6d2": { name: "Border gray-green", role: "Borders and separators" },
  "#eef2ef": { name: "Pale surface", role: "Sidebars, tabs, title and status bars" },
  "#f6f8f6": { name: "Near-white surface", role: "Editor, panel and terminal background" },
  "#ffffff": { name: "White", role: "Menus, suggestions, inputs, peek editors" },
};

// Opaque in-between values, each with a single job.
export const tints = {
  "#245630": "Button hover, active links, focused list match",
  "#7f8a86": "Input, dropdown and checkbox borders; ghost text",
  "#8c9894": "Decorations only: indent guide, disabled breakpoint",
  "#c7d7cb": "Selected item in lists and trees",
  "#d5e1d8": "Selected item in menus, Quick Open and suggestions",
  "#dce8df": "Inactive list selection, badges, menu bar",
  "#dfe7e1": "List hover",
  "#e4ebe6": "Tab and button hover",
  "#e4e9e6": "Indent guides and rulers",
  "#fcf3f2": "Error validation and exception backgrounds",
  "#f8edc9": "Warning validation background",
  "#ebeff1": "Info validation background",
  "#f0f3f1": "Current line highlight",
  "#b8443a": "Terminal bright red",
  "#3a7d4a": "Terminal bright green",
  "#8f6809": "Terminal bright yellow",
  "#4a6e8e": "Terminal bright blue",
  "#8d5a80": "Terminal bright magenta",
  "#367878": "Terminal bright cyan",
};
