import { useContext } from "solid-js";

import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";
import { TaxesResult, taxValues } from "@app/store/rules";

export function Taxes() {
  const [state, setState] = useContext(StoreContext)!;

  const allTaxes = (): TaxesResult => {
    return taxValues(state.building);
  };

  const total = (): number => {
    return Object.values(allTaxes()).reduce((total, value) => total + value, 0);
  };

  return (
    <section class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="col-span-3 font-bold text-xl flex items-center">
          <h2 class="inline-block">Imposte e Tasse</h2>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label class="col-span-2 flex items-center" for="seller">
            Il soggetto venditore e'
          </label>
          <select
            id="seller"
            name="seller"
            autocomplete="seller"
            class="select select-bordered w-full"
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
        <div class="grid grid-cols-3 gap-2">
          <label class="col-span-2 flex items-center" for="prima-casa">
            L'immobile costituisce
          </label>
          <select
            id="prima-casa"
            name="prima-casa"
            autocomplete="prima-casa"
            class="select select-bordered w-full"
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
        <div
          class={
            state.building.isSoldByCompany ? "hidden" : "grid grid-cols-3 gap-2"
          }
        >
          <label class="col-span-2 flex items-center" for="renditaCatastale">
            Rendita Catastale
            <a
              href="https://sister3.agenziaentrate.gov.it/CitizenVisure/index.do"
              rel="noopener noreferrer"
              target="_blank"
              class="link link-primary ml-6"
            >
              {" "}
              Trova rendita castastale
            </a>
          </label>
          <Input
            id="renditaCatastale"
            symbol="€"
            disabled={state.building.isSoldByCompany}
            value={state.building.renditaCatastale}
            onChange={(value) =>
              setState("building", "renditaCatastale", value)
            }
          />
        </div>
        <div
          class={
            state.building.isSoldByCompany ? "grid grid-cols-3 gap-2" : "hidden"
          }
        >
          <label class="col-span-2 flex items-center" for="VAT">
            IVA {state.building.isPrimaCasa ? "4%" : "10%"}
          </label>
          <Input id="VAT" symbol="€" disabled={true} value={allTaxes().VAT} />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label class="col-span-2 flex items-center" for="registro">
            Imposta di registro
          </label>
          <Input
            id="registro"
            symbol="€"
            disabled={true}
            value={allTaxes().registro}
          />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label class="col-span-2 flex items-center" for="catastale">
            Imposta catastale
          </label>
          <Input
            id="catastale"
            symbol="€"
            disabled={true}
            value={allTaxes().catastale}
          />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label class="col-span-2 flex items-center" for="ipotecaria">
            Imposta ipotecaria
          </label>
          <Input
            id="ipotecaria"
            symbol="€"
            disabled={true}
            value={allTaxes().ipotecaria}
          />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <label
            class="col-span-2 flex items-center font-bold"
            for="taxesTotal"
          >
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
      </div>
    </section>
  );
}
