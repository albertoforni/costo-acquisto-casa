import { createState } from "solid-js";

import { Building, init as initBuildings } from "@app/store/building";

export const init = (initialValue: { building: Building } | undefined) =>
  createState(
    initialValue || {
      building: initBuildings(),
    },
  );

export type Store = ReturnType<typeof init>;
