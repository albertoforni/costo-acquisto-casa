import { createState, useContext } from "solid-js";

import { Input } from "@app/input";
import { agencyFee } from "@app/store/rules";
import { StoreContext } from "@app/store-context";

export function Agency() {
  const [state, setState] = useContext(StoreContext);

  const total = () => {
    if (state.building.isViaAgent) {
      if (state.building.hasOverriddenAgencyFee) {
        return agencyFee({
          kind: "VALUE",
          fee: state.building.overriddenAgentFee,
        });
      } else {
        return agencyFee({
          kind: "PERCENTAGE",
          percentage: state.building.agentPercentageFee,
          price: state.building.price,
        });
      }
    } else {
      return agencyFee({ kind: "NONE" });
    }
  };

  console.log(total);

  return (
    <section class="mt-2 grid grid-cols-3 gap-2">
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
        <label class="col-span-2" for="percentage">
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
              : "-"
          }
          onInput={(e) =>
            setState(
              "building",
              "agentPercentageFee",
              parseFloat(e.currentTarget.value),
            )
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
              ? "-"
              : agencyFee({
                  kind: "PERCENTAGE",
                  price: state.building.price,
                  percentage: state.building.agentPercentageFee,
                }).toString()
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
              : "-"
          }
          onInput={(e) =>
            setState(
              "building",
              "overriddenAgentFee",
              parseInt(e.currentTarget.value),
            )
          }
        />
      </div>
      <div class="col-start-3">
        <Input id="agencyTotal" symbol="€" disabled={true} value={total()} />
      </div>
    </section>
  );
}
