import { createContext } from "solid-js";
import type { Store } from "@app/store/index";

export const StoreContext = createContext<Store>(undefined!);
