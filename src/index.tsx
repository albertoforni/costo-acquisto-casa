import { App } from "@app/app";
import { ErrorBoundary } from "@app/error-boundary";
import { StoreContext } from "@app/store-context";
import { init, StoreState } from "@app/store/index";
import "@app/styles/tailwind.css";
import { createRenderEffect } from "solid-js";
import { render } from "solid-js/web";

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

// Google Analytics 4
(function startTracking() {
  if (!import.meta.env.VITE_PUBLIC_GOOGLE_ANALYTICS_ID) return;

  const frag = document.createRange().createContextualFragment(`
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${
    import.meta.env.VITE_PUBLIC_GOOGLE_ANALYTICS_ID
  }"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${import.meta.env.VITE_PUBLIC_GOOGLE_ANALYTICS_ID}', {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  </script>
  `);
  document.getElementsByTagName("head")[0].appendChild(frag);
})();

const dispose = render(
  () => (
    <ErrorBoundary>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </ErrorBoundary>
  ),
  document.getElementById("app")!,
);
