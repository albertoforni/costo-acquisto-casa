import { useContext } from "solid-js";

import { Input } from "@app/input";
import { taxes, TaxesResult } from "@app/store/rules";
import { StoreContext } from "@app/store-context";

export function Taxes() {
  const [state, setState] = useContext(StoreContext);

  const taxValues = (): TaxesResult => {
    if (state.building.isSoldByCompany) {
      return taxes({
        price: state.building.price,
        isPrimaCasa: state.building.isPrimaCasa,
        isSoldByCompany: state.building.isSoldByCompany,
      });
    } else {
      return taxes({
        isPrimaCasa: state.building.isPrimaCasa,
        isSoldByCompany: state.building.isSoldByCompany,
        renditaCatastale: state.building.renditaCatastale,
      });
    }
  };

  const total = (): number => {
    return Object.values(taxValues()).reduce(
      (total, value) => total + value,
      0,
    );
  };

  return (
    <section class="mt-4 grid grid-cols-3 gap-2 border p-2 border-gray-200 rounded">
      <div class="col-span-3 font-bold text-xl flex items-center">
        <h2 class="inline-block">Imposte e Tasse</h2>
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="seller">
          Il soggetto venditore e'
        </label>
        <select
          id="seller"
          name="seller"
          autocomplete="seller"
          class="w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) =>
            setState(
              "building",
              "isSoldByCompany",
              e.currentTarget.selectedIndex === 1,
            )
          }
        >
          <option value="privato" selected={!state.building.isSoldByCompany}>
            Privato
          </option>
          <option value="company" selected={state.building.isSoldByCompany}>
            Impresa
          </option>
        </select>
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="prima-casa">
          L'immobile costituisce
        </label>
        <select
          id="prima-casa"
          name="prima-casa"
          autocomplete="prima-casa"
          class="w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) =>
            setState(
              "building",
              "isPrimaCasa",
              e.currentTarget.selectedIndex === 0,
            )
          }
        >
          <option value="prima-casa" selected={state.building.isPrimaCasa}>
            Prima Casa
          </option>
          <option value="seconda-casa" selected={!state.building.isPrimaCasa}>
            Seconda Casa
          </option>
        </select>
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="renditaCatastale">
          Rendita Catastale
        </label>
        <Input
          id="renditaCatastale"
          symbol="€"
          disabled={state.building.isSoldByCompany}
          value={state.building.renditaCatastale}
          onInput={(e) =>
            setState(
              "building",
              "renditaCatastale",
              parseInt(e.currentTarget.value),
            )
          }
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="registro">
          Imposta di registro
        </label>
        <Input
          id="registro"
          symbol="€"
          disabled={true}
          value={taxValues().registro}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="catastale">
          Imposta catastale
        </label>
        <Input
          id="catastale"
          symbol="€"
          disabled={true}
          value={taxValues().catastale}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="ipotecaria">
          Imposta ipotecaria
        </label>
        <Input
          id="ipotecaria"
          symbol="€"
          disabled={true}
          value={taxValues().ipotecaria}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center font-bold" for="taxesTotal">
          Totale
        </label>
        <Input
          id="taxesTotal"
          symbol="€"
          disabled={true}
          isBold={true}
          value={total()}
        />
      </div>
    </section>
  );
}
