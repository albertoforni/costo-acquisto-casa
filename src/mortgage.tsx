import { useContext } from "solid-js";

import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";
import { mortgage } from "@app/store/rules";

export function Mortgage() {
  const [state, setState] = useContext(StoreContext)!;

  const impostaSostitutiva = () =>
    mortgage({
      mortgage: state.building.mortgage,
      isPrimaCasa: state.building.isPrimaCasa,
    }).impostaSostitutiva;

  const total = () => {
    return (
      state.building.particaMutuo +
      state.building.perizia +
      impostaSostitutiva()
    );
  };

  return (
    <section class="mt-4 grid grid-cols-3 gap-2 border p-2 border-gray-200 rounded">
      <label class="col-span-3 font-bold text-xl flex items-center">
        <input
          class="h-4 w-4 mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          type="checkbox"
          checked={state.building.hasMortgage}
          onChange={() =>
            setState("building", "hasMortgage", !state.building.hasMortgage)
          }
        />
        <h2 class="inline-block">Mutuo</h2>
      </label>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="mortgage">
          Importo Mutuo
        </label>
        <Input
          id="mortgage"
          symbol="€"
          disabled={!state.building.hasMortgage}
          value={state.building.hasMortgage ? state.building.mortgage : null}
          onChange={(value) => setState("building", "mortgage", value)}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="praticaMutuo">
          Importo pratica mutuo
        </label>
        <Input
          id="praticaMutuo"
          symbol="€"
          disabled={!state.building.hasMortgage}
          value={
            state.building.hasMortgage ? state.building.particaMutuo : null
          }
          onChange={(value) => setState("building", "particaMutuo", value)}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="perizia">
          Perizia dell'immobile
        </label>
        <Input
          id="perizia"
          symbol="€"
          disabled={!state.building.hasMortgage}
          value={state.building.hasMortgage ? state.building.perizia : null}
          onChange={(value) => setState("building", "perizia", value)}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="impostaSostitutiva">
          Imposta sostitutiva
        </label>
        <Input
          id="impostaSostitutiva"
          symbol="€"
          disabled={true}
          value={state.building.hasMortgage ? impostaSostitutiva() : null}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center font-bold" for="costiMutuo">
          Totale costi per mutuo
        </label>
        <Input
          id="costiMutuo"
          symbol="€"
          disabled={true}
          value={state.building.hasMortgage ? total() : null}
          isBold={true}
        />
      </div>
    </section>
  );
}
