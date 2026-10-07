from dataclasses import dataclass


@dataclass
class Palette:
    accent: str = "#2d6a3b"
    surface: str = "#eef2ef"


def describe(color: str, label: str = "accent") -> str:
    """Return a readable color label."""
    if not color.startswith("#"):
        raise ValueError("Expected a hex color")
    return f"{label}: {color}"


print(describe(Palette().accent))
