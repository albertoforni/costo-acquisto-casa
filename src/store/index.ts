import { createStore } from "solid-js/store";

import { Building, init as initBuildings } from "@app/store/building";

export type StoreState = { building: Building };

export const init = (initialValue: StoreState | undefined) =>
  createStore(
    initialValue || {
      building: initBuildings(),
    },
  );

export type Store = ReturnType<typeof init>;
