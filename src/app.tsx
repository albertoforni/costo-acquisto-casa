import { Actions } from "@app/actions";
import { Agency } from "@app/agency";
import { Input } from "@app/input";
import { Mortgage } from "@app/mortgage";
import { Notary } from "@app/notary";
import { StoreContext } from "@app/store-context";
import { Taxes } from "@app/taxes";
import { Total } from "@app/total";
import { Calculator, Home } from "lucide-solid";
import { Component, useContext, onMount, createEffect } from "solid-js";

export const App: Component = () => {
  const [state, setState] = useContext(StoreContext)!;

  // Initialize theme on mount
  onMount(() => {
    // Apply the current theme from store
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("theme", state.theme);
  });

  // Watch for theme changes and update DOM and localStorage
  createEffect(() => {
    const currentTheme = state.theme;
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  });

  return (
    <div class="min-h-screen bg-base-200">
      <main class="p-4 mx-auto space-y-6 max-w-4xl sm:p-6">
        <div class="shadow-xl card bg-base-100">
          <div class="card-body">
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
              <div class="min-w-0">
                <h1 class="flex gap-2 items-center text-2xl card-title sm:text-3xl">
                  <Home class="w-8 h-8" />
                  Costo Acquisto Casa
                </h1>
                <p class="mt-1 text-base-content/80">
                  Calcola quanto costa veramente comprare casa
                </p>
              </div>
              <div class="flex flex-wrap gap-2 items-center self-start sm:self-auto">
                <Actions />
                <label
                  class="swap swap-rotate"
                  for="theme-toggle"
                  aria-label="Attiva/disattiva tema scuro"
                >
                  <input
                    id="theme-toggle"
                    type="checkbox"
                    checked={state.theme === "dark"}
                    onChange={(e) => {
                      const isDark = (e.currentTarget as HTMLInputElement)
                        .checked;
                      setState("theme", isDark ? "dark" : "light");
                    }}
                  />
                  <svg
                    class="w-6 h-6 fill-current swap-off"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64 17l-.71.71a.996.996 0 101.41 1.41l.71-.71A.996.996 0 105.64 17zm-.71-10.95a.996.996 0 000 1.41l.71.71A.996.996 0 107.05 6.1l-.71-.71a.996.996 0 00-1.41 0zM11 3h2v3h-2zM4 11H1v2h3zM11 18h2v3h-2zM20 11h3v2h-3zM17.66 6.34a.996.996 0 101.41-1.41l-.71-.71a.996.996 0 10-1.41 1.41l.71.71zM18.36 17a.996.996 0 10-1.41 1.41l.71.71a.996.996 0 001.41-1.41l-.71-.71zM12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  <svg
                    class="w-6 h-6 fill-current swap-on"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64 13A9 9 0 1111 2.36 7 7 0 1021.64 13z" />
                  </svg>
                </label>
              </div>
            </div>

            <section class="mt-2 space-y-4">
              <div class="grid grid-cols-1 gap-4 items-center sm:grid-cols-3">
                <label
                  class="flex gap-2 items-center text-lg font-semibold sm:col-span-2"
                  for="price"
                >
                  <Calculator class="w-5 h-5" />
                  Prezzo di acquisto
                </label>
                <Input
                  id="price"
                  onChange={(value) => {
                    setState("building", "price", value);
                  }}
                  value={state.building.price}
                  symbol="€"
                />
              </div>

              <label class="w-full form-control">
                <div class="label">
                  <span class="label-text">Descrizione</span>
                </div>
                <input
                  class="w-full input input-bordered"
                  id="description"
                  placeholder="Inserisci una descrizione della proprietà..."
                  onChange={(e) =>
                    setState("building", "description", e.currentTarget.value)
                  }
                  value={state.building.description}
                />
              </label>
            </section>
          </div>
        </div>

        <div class="grid gap-6">
          <Agency />
          <Taxes />
          <Mortgage />
          <Notary />
          <Total />
        </div>
      </main>
    </div>
  );
};
