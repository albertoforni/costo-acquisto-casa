import { createState } from "solid-js";

import { Input } from "@app/input";
import { agencyFee } from "@app/store/rules";

type Props = {
  price: number;
};

export function Agency(props: Props) {
  const [state, setState] = createState({
    isViaAgency: false,
    percentage: 3,
    isOverriddenAgencyFee: false,
    overriddenAgencyFee: 0,
  });

  const total = () => {
    if (state.isViaAgency) {
      if (state.isOverriddenAgencyFee) {
        return agencyFee({ kind: "VALUE", fee: state.overriddenAgencyFee });
      } else {
        return agencyFee({
          kind: "PERCENTAGE",
          percentage: state.percentage,
          price: props.price,
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
          checked={state.isViaAgency}
          onChange={() => setState("isViaAgency", !state.isViaAgency)}
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
          disabled={!state.isViaAgency || state.isOverriddenAgencyFee}
          value={
            state.isViaAgency && !state.isOverriddenAgencyFee
              ? state.percentage
              : "-"
          }
          onInput={(e) =>
            setState("percentage", parseFloat(e.currentTarget.value))
          }
        />
      </div>
      <div class="col-start-3">
        <Input
          id="percentageFee"
          symbol="€"
          disabled={true}
          value={
            !state.isViaAgency || state.isOverriddenAgencyFee
              ? "-"
              : agencyFee({
                  kind: "PERCENTAGE",
                  price: props.price,
                  percentage: state.percentage,
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
            checked={state.isOverriddenAgencyFee}
            onChange={() =>
              setState("isOverriddenAgencyFee", !state.isOverriddenAgencyFee)
            }
          />
          <label htmlFor="selectAgencyFixed">
            oppure indica il prezzo forfettario concordato con IVA
          </label>
        </label>
        <Input
          id="agencyFixed"
          symbol="€"
          disabled={!state.isOverriddenAgencyFee}
          value={state.isOverriddenAgencyFee ? state.overriddenAgencyFee : "-"}
          onInput={(e) =>
            setState("overriddenAgencyFee", parseInt(e.currentTarget.value))
          }
        />
      </div>
      <div class="col-start-3">
        <Input id="agencyTotal" symbol="€" disabled={true} value={total()} />
      </div>
    </section>
  );
}
