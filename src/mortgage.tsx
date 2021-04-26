import { useContext } from "solid-js";

import { Input } from "@app/input";
import { mortgage } from "@app/store/rules";
import { StoreContext } from "@app/store-context";

export function Mortgage() {
  const [state, setState] = useContext(StoreContext);

  const impostaSostitutiva = () =>
    mortgage({
      price: state.building.price,
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
        <label class="col-span-2" for="mortgage">
          Importo Mutuo
        </label>
        <Input
          id="mortgage"
          symbol="€"
          disabled={!state.building.hasMortgage}
          value={state.building.mortgage}
          onInput={(e) =>
            setState("building", "mortgage", parseInt(e.currentTarget.value))
          }
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2" for="praticaMutuo">
          Importo pratica mutuo
        </label>
        <Input
          id="praticaMutuo"
          symbol="€"
          disabled={!state.building.hasMortgage}
          value={state.building.particaMutuo}
          onInput={(e) =>
            setState(
              "building",
              "particaMutuo",
              parseInt(e.currentTarget.value),
            )
          }
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2" for="perizia">
          Perizia dell'immobile
        </label>
        <Input
          id="perizia"
          symbol="€"
          disabled={!state.building.hasMortgage}
          value={state.building.perizia}
          onInput={(e) =>
            setState("building", "perizia", parseInt(e.currentTarget.value))
          }
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2" for="impostaSostitutiva">
          Imposta sostitutiva
        </label>
        <Input
          id="impostaSostitutiva"
          symbol="€"
          disabled={true}
          value={impostaSostitutiva()}
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
          value={total()}
          isBold={true}
        />
      </div>
    </section>
  );
}
