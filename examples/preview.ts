interface Palette {
  accent: string;
  surface: string;
}

class ThemePreview {
  constructor(private readonly palette: Palette) {}

  describe(): string {
    return `Accent: ${this.palette.accent}`;
  }
}

const preview = new ThemePreview({ accent: "#2d6a3b", surface: "#eef2ef" });
