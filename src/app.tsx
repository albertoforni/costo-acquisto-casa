import { Component, useContext } from "solid-js";
import { Actions } from "@app/actions";
import { Agency } from "@app/agency";
import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";
import { Taxes } from "@app/taxes";
import { Mortgage } from "@app/mortgage";
import { Notary } from "@app/notary";
import { Total } from "@app/total";

export const App: Component = () => {
  const [state, setState] = useContext(StoreContext);

  return (
    <main class="max-w-2xl m-auto grid p-3">
      <div class="grid grid-cols-3 gap-2">
        <h1 class="col-span-2 text-2xl flex-1">Costo Acquisto Casa 🏠</h1>
        <div class="grid gap-4 grid-cols-2">
          <Actions />
        </div>
      </div>
      <p class="italic">Calcola quanto costa veramente comprare casa</p>
      <section class="mt-4 grid grid-cols-3 gap-2 font-bold text-xl">
        <label class="col-span-2 flex items-center" htmlFor="price">
          Prezzo di acquisto
        </label>
        <Input
          id="price"
          onChange={(value) => setState("building", "price", value)}
          value={state.building.price}
          symbol="€"
        />
      </section>
      <section class="">
        <input
          class="block mt-2 border w-full focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300 p-1 disabled:bg-gray-200"
          id="description"
          placeholder="descrizione"
          onChange={(e) =>
            setState("building", "description", e.currentTarget.value)
          }
          value={state.building.description}
        />
      </section>
      <Agency />
      <Taxes />
      <Mortgage />
      <Notary />
      <Total />
    </main>
  );
};
