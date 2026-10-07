const palette = {
  accent: "#2d6a3b",
  surface: "#eef2ef",
};

function describeColor(name, value) {
  return `${name}: ${value}`;
}

if (palette.accent) {
  console.log(describeColor("forest", palette.accent));
}
