import { createState } from "solid-js";

import { Building, init as initBuildings } from "@app/store/building";

export type StoreState = { building: Building };

export const init = (initialValue: StoreState | undefined) =>
  createState(
    initialValue || {
      building: initBuildings(),
    },
  );

export type Store = ReturnType<typeof init>;
