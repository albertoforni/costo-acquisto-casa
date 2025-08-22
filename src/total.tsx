import { Input } from "@app/input";
import { StoreContext } from "@app/store-context";
import { mortgage, taxValues, totalAgencyFee } from "@app/store/rules";
import { Calculator, Info } from "lucide-solid";
import { useContext } from "solid-js";

export function Total() {
  const [state, setState] = useContext(StoreContext)!;

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
    <section class="card bg-base-100 shadow-xl">
      <div class="card-body space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold flex items-center gap-2">
            <Calculator class="h-6 w-6" />
            Totali
          </h2>
          <div class="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-base-300 to-transparent"></div>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-3 gap-4 items-center">
            <label class="col-span-2 text-lg font-semibold" for="totalCost">
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

          <div class="grid grid-cols-3 gap-4 items-center">
            <label class="col-span-2 text-lg font-semibold" for="grandTotal">
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
        </div>

        <div class="mt-4 p-4 bg-base-200 rounded-md">
          <p class="text-sm flex items-start gap-2">
            <Info class="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              Il totale esborso monetario include il prezzo di acquisto più
              tutti i costi accessori. I costi accessori includono agenzia,
              tasse, mutuo e notaio.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
