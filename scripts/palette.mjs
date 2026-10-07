// The Verdant Ledger Light palette. The validator accepts only these colors,
// their translucent forms (#rrggbbaa) for palette colors, and the derived
// tints below. Keep this file in step with the tables in DESIGN.md.

export const palette = {
  "#1b2320": "Deep evergreen",
  "#5d6864": "Evergreen gray",
  "#66716d": "Muted gray-green",
  "#2d6a3b": "Forest green",
  "#b8860b": "Warm ochre",
  "#8a6408": "Accessible ochre",
  "#8a2621": "Muted red",
  "#3d5f7a": "Slate blue",
  "#2f6b6b": "Muted teal",
  "#7a4a6e": "Plum",
  "#cfd6d2": "Border gray-green",
  "#eef2ef": "Pale surface",
  "#f6f8f6": "Near-white surface",
  "#ffffff": "White",
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
