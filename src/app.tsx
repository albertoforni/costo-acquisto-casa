import { Component, useContext } from "solid-js";
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
      <h1 class="text-2xl">Costo Acquisto Casa 🏠</h1>
      <section class="mt-4 grid grid-cols-3 gap-2 font-bold text-xl">
        <label class="col-span-2" htmlFor="price">
          Prezzo di acquisto
        </label>
        <Input
          id="price"
          onChange={(value) => setState("building", "price", value)}
          value={state.building.price}
          symbol="€"
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
