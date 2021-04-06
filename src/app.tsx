import { Component, createSignal } from "solid-js";
import { agencyFee } from "./store/rules";

export const App: Component = () => {
  const [price, setPrice] = createSignal(0);

  return (
    <main>
      <h1 className="text-2xl">Costo Acquisto Casa</h1>
      <input
        onInput={(e) => setPrice(parseInt(e.currentTarget.value))}
        class="text-gray-900 font-bold"
      />
      <p>{agencyFee({ kind: "PERCENTAGE", price: price(), percentage: 3 })}</p>
    </main>
  );
};
