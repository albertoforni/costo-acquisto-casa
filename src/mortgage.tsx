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
    <section class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <label class="col-span-3 font-bold text-xl flex items-center gap-2">
          <input
            class="checkbox checkbox-primary"
            type="checkbox"
            checked={state.building.hasMortgage}
            onChange={() =>
              setState("building", "hasMortgage", !state.building.hasMortgage)
            }
          />
          <h2 class="inline-block">Mutuo</h2>
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label class="sm:col-span-2 flex items-center" for="mortgage">
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
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label class="sm:col-span-2 flex items-center" for="praticaMutuo">
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
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label class="sm:col-span-2 flex items-center" for="perizia">
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
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label
            class="sm:col-span-2 flex items-center"
            for="impostaSostitutiva"
          >
            Imposta sostitutiva
          </label>
          <Input
            id="impostaSostitutiva"
            symbol="€"
            disabled={true}
            value={state.building.hasMortgage ? impostaSostitutiva() : null}
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label
            class="sm:col-span-2 flex items-center font-bold"
            for="costiMutuo"
          >
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
      </div>
    </section>
  );
}
