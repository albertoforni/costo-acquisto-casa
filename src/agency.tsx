import { useContext } from "solid-js";

import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";
import { agencyFee, totalAgencyFee } from "@app/store/rules";

export function Agency() {
  const [state, setState] = useContext(StoreContext)!;

  const total = () => {
    return totalAgencyFee(state.building);
  };

  return (
    <section class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <label class="col-span-3 font-bold text-xl flex items-center gap-2">
          <input
            class="checkbox checkbox-primary"
            type="checkbox"
            checked={state.building.isViaAgent}
            onChange={() =>
              setState("building", "isViaAgent", !state.building.isViaAgent)
            }
          />
          <h2 class="inline-block">Agenzia</h2>
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label class="sm:col-span-2 flex items-center" for="percentage">
            Di norma le agenzie hanno una provvigione del 3% + IVA 22% sul
            prezzo di vendita
          </label>
          <Input
            id="percentage"
            symbol="%"
            disabled={
              !state.building.isViaAgent ||
              state.building.hasOverriddenAgencyFee
            }
            value={
              state.building.isViaAgent &&
              !state.building.hasOverriddenAgencyFee
                ? state.building.agentPercentageFee
                : null
            }
            onChange={(value) =>
              setState("building", "agentPercentageFee", value)
            }
          />
        </div>
        <div class="sm:col-start-3">
          <Input
            id="percentageFee"
            symbol="€"
            disabled={true}
            value={
              !state.building.isViaAgent ||
              state.building.hasOverriddenAgencyFee
                ? null
                : agencyFee({
                    kind: "PERCENTAGE",
                    price: state.building.price,
                    percentage: state.building.agentPercentageFee,
                  })
            }
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label class="sm:col-span-2 flex items-center" for="agencyFixed">
            <input
              id="selectAgencyFixed"
              type="checkbox"
              class="checkbox checkbox-primary mr-2"
              checked={state.building.hasOverriddenAgencyFee}
              onChange={() =>
                setState(
                  "building",
                  "hasOverriddenAgencyFee",
                  !state.building.hasOverriddenAgencyFee,
                )
              }
            />
            <span>oppure indica il prezzo forfettario concordato con IVA</span>
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
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label
            class="sm:col-span-2 flex items-center font-bold"
            for="agencyTotal"
          >
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
      </div>
    </section>
  );
}
