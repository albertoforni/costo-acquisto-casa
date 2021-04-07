import { Component, createSignal } from "solid-js";
import { agencyFee } from "./store/rules";

export const App: Component = () => {
  const [price, setPrice] = createSignal(0);

  return (
    <main class="max-w-xl m-auto grid p-3">
      <h1 class="text-2xl">Costo Acquisto Casa</h1>
      <section class="grid grid-cols-3">
        <label class="col-span-2" htmlFor="price">
          Prezzo di acquisto
        </label>
        <input
          id="price"
          class="border focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300 text-right"
          onInput={(e) => setPrice(parseInt(e.currentTarget.value))}
        />
      </section>
      <section class="grid grid-cols-3">
        <h2 class="col-span-3">Agenzia</h2>
        <div>
          <input
            disabled
            value={agencyFee({
              kind: "PERCENTAGE",
              price: price(),
              percentage: 3,
            })}
          />
        </div>
      </section>
    </main>
  );
};
