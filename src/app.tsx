import { Component, useContext } from "solid-js";
import { Agency } from "@app/agency";
import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";

export const App: Component = () => {
  const [state, setState] = useContext(StoreContext);

  return (
    <main class="max-w-2xl m-auto grid p-3">
      <h1 class="text-2xl">Costo Acquisto Casa</h1>
      <section class="mt-2 grid grid-cols-3 gap-2 font-bold text-xl">
        <label class="col-span-2" htmlFor="price">
          Prezzo di acquisto
        </label>
        <Input
          id="price"
          onInput={(e) =>
            setState("building", "price", parseInt(e.currentTarget.value))
          }
          value={state.building.price}
          symbol="€"
        />
      </section>
      <Agency />
    </main>
  );
};
