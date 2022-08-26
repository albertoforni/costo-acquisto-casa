import { App } from "@app/app";
import { StoreContext } from "@app/store-context";
import { init, StoreState } from "@app/store/index";
import "@app/styles/tailwind.css";
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mixpanel from "mixpanel-browser";
import { createRenderEffect } from "solid-js";
import { render } from "solid-js/web";

dotenv.config()

function initStore(): StoreState | undefined {
  try {
    const storeStr = atob(window.location.hash.replace(/^#/, ""));
    const storeInitialValue = JSON.parse(storeStr);
    return storeInitialValue;
  } catch (e) {
    console.log("Unable to initiate Store", e);
    return undefined;
  }
}

function saveStateInWindow() {
  try {
    const storeJSONStr = JSON.stringify(store[0], null, 4);
    const base64 = btoa(storeJSONStr);
    window.location.hash = `#${base64}`;
  } catch (e) {
    console.log("Unable to update hash", e);
  }
}

const store = init(initStore());

createRenderEffect(() => {
  saveStateInWindow();
});

const dispose = render(
  () => {
    mixpanel.init(process.env.SNOWPACK_PUBLIC_MIXPANEL_ID!, { debug: import.meta.env.MODE === "development" });
    mixpanel.track("Open page");

    return (
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    )
  },
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
