import { render } from "solid-js/web";
import { createRenderEffect } from "solid-js";

import "@app/styles/tailwind.css";
import { App } from "@app/app";
import { init } from "@app/store/index";
import { StoreContext } from "@app/store-context";

const localStorageStore = localStorage.getItem("store");
const storeInitialValue = localStorageStore
  ? JSON.parse(localStorageStore)
  : null;

const store = init(storeInitialValue);

createRenderEffect(() => {
  Object.values(store[0]);
  localStorage.setItem("store", JSON.stringify(store[0], null, 4));
});

if (import.meta.env.MODE === "development") {
  createRenderEffect(() => {
    Object.values(store[0]);
    console.log(JSON.stringify(store[0], null, 4));
  });
}

const dispose = render(
  () => (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  ),
  document.getElementById("app")!,
);

/**
 * Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
 * Learn more: https://www.snowpack.dev/#hot-module-replacement
 *
 * Note: Solid doesn't support state preservation on hot reload as of yet
 */
if (import.meta.env.MODE === "development") {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
