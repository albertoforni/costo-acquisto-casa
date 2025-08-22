import { createStore } from "solid-js/store";

import { Building, init as initBuildings } from "@app/store/building";

export type StoreState = {
  building: Building;
  theme: "light" | "dark";
};

// Detect initial theme preference
function detectInitialTheme(): "light" | "dark" {
  // Check localStorage first
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) {
    return savedTheme;
  }

  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  // Default to light theme
  return "light";
}

export const init = (initialValue: StoreState | undefined) =>
  createStore(
    initialValue || {
      building: initBuildings(),
      theme: detectInitialTheme(),
    },
  );

export type Store = ReturnType<typeof init>;
