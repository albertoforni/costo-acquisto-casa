import { useContext } from "solid-js";

import { Input } from "@app/input";
import { agencyFee, totalAgencyFee } from "@app/store/rules";
import { StoreContext } from "@app/store-context";

export function Agency() {
  const [state, setState] = useContext(StoreContext);

  const total = () => {
    return totalAgencyFee(state.building);
  };

  return (
    <section class="mt-4 grid grid-cols-3 gap-2 border p-2 border-gray-200 rounded">
      <label class="col-span-3 font-bold text-xl flex items-center">
        <input
          class="h-4 w-4 mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          type="checkbox"
          checked={state.building.isViaAgent}
          onChange={() =>
            setState("building", "isViaAgent", !state.building.isViaAgent)
          }
        />
        <h2 class="inline-block">Agenzia</h2>
      </label>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="percentage">
          Di norma le agenzie hanno una provvigione del 3% + IVA 22% sul prezzo
          di vendita
        </label>
        <Input
          id="percentage"
          symbol="%"
          disabled={
            !state.building.isViaAgent || state.building.hasOverriddenAgencyFee
          }
          value={
            state.building.isViaAgent && !state.building.hasOverriddenAgencyFee
              ? state.building.agentPercentageFee
              : null
          }
          onChange={(value) =>
            setState("building", "agentPercentageFee", value)
          }
        />
      </div>
      <div class="col-start-3">
        <Input
          id="percentageFee"
          symbol="€"
          disabled={true}
          value={
            !state.building.isViaAgent || state.building.hasOverriddenAgencyFee
              ? null
              : agencyFee({
                  kind: "PERCENTAGE",
                  price: state.building.price,
                  percentage: state.building.agentPercentageFee,
                })
          }
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center" for="agencyFixed">
          <input
            id="selectAgencyFixed"
            type="checkbox"
            class="h-4 w-4 mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={state.building.hasOverriddenAgencyFee}
            onChange={() =>
              setState(
                "building",
                "hasOverriddenAgencyFee",
                !state.building.hasOverriddenAgencyFee,
              )
            }
          />
          <label htmlFor="selectAgencyFixed">
            oppure indica il prezzo forfettario concordato con IVA
          </label>
        </label>
        <Input
          id="agencyFixed"
          symbol="€"
          disabled={!state.building.hasOverriddenAgencyFee}
          value={
            state.building.hasOverriddenAgencyFee
              ? state.building.overriddenAgentFee
              : null
          }
          onChange={(value) =>
            setState("building", "overriddenAgentFee", value)
          }
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center font-bold" for="agencyTotal">
          Totale Costi Agenzia
        </label>
        <Input
          id="agencyTotal"
          symbol="€"
          disabled={true}
          value={total()}
          isBold={true}
        />
      </div>
    </section>
  );
}
