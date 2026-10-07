import { useState } from "react";

// Components, props, and JSX attributes
export function Swatch({ name, hex, onPick }) {
  const [active, setActive] = useState(false);

  return (
    <button
      className={active ? "swatch is-active" : "swatch"}
      style={{ background: hex }}
      aria-pressed={active}
      onClick={() => {
        setActive(!active);
        onPick?.(hex);
      }}
    >
      {name} <code>{hex}</code>
    </button>
  );
}
