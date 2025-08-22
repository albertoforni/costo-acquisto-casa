import { useContext } from "solid-js";

import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";

export function Notary() {
  const [state, setState] = useContext(StoreContext)!;

  return (
    <section class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="col-span-3 font-bold text-xl flex items-center">
          <h2 class="inline-block">Oneri Notarili</h2>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label class="col-span-2 flex items-center" for="notary">
            Oneri notarili IVA 22% inclusa
          </label>
          <Input
            id="notary"
            symbol="€"
            value={state.building.notaryFee}
            onChange={(value) => setState("building", "notaryFee", value)}
          />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label
            class="col-span-2 flex items-center font-bold"
            for="notaryTotal"
          >
            Totale Oneri Notarili
          </label>
          <Input
            id="notaryTotal"
            symbol="€"
            disabled={true}
            value={state.building.notaryFee}
            isBold={true}
          />
        </div>
      </div>
    </section>
  );
}
