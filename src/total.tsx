import { useContext } from "solid-js";

import { Input } from "@app/input";
import { mortgage, taxValues, totalAgencyFee } from "@app/store/rules";
import { StoreContext } from "@app/store-context";

export function Total() {
  const [state, setState] = useContext(StoreContext);

  const mortgageCost = () => {
    return (
      state.building.particaMutuo +
      state.building.perizia +
      mortgage({
        mortgage: state.building.mortgage,
        isPrimaCasa: state.building.isPrimaCasa,
      }).impostaSostitutiva
    );
  };

  const totalCost = () => {
    return (
      totalAgencyFee(state.building) +
      Object.values(taxValues(state.building)).reduce(
        (total, value) => total + value,
        0,
      ) +
      mortgageCost() +
      state.building.notaryFee
    );
  };

  const grandTotal = () => {
    return state.building.price + totalCost();
  };

  return (
    <section class="mt-4 grid grid-cols-3 gap-2 border p-2 border-gray-200 rounded">
      <div class="col-span-3 font-bold text-xl flex items-center">
        <h2 class="inline-block">Totali</h2>
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center font-bold" for="totalCost">
          Totale costi
        </label>
        <Input
          id="totalCost"
          symbol="€"
          disabled={true}
          value={totalCost()}
          isBold={true}
        />
      </div>
      <div class="col-span-3 grid grid-cols-3 gap-2">
        <label class="col-span-2 flex items-center font-bold" for="grandTotal">
          Totale esborso monetario
        </label>
        <Input
          id="grandTotal"
          symbol="€"
          disabled={true}
          value={grandTotal()}
          isBold={true}
        />
      </div>
    </section>
  );
}
