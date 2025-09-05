import { createStore } from "solid-js/store";
import { z } from "zod";

import {
  Building,
  BuildingSchema,
  init as initBuildings,
} from "@app/store/building";

// Zod schema for validating imported store state
export const StoreStateSchema = z.object({
  building: BuildingSchema,
  theme: z.enum(["light", "dark"]),
});

// Export the inferred StoreState type
export type StoreState = z.infer<typeof StoreStateSchema>;

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
