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
    <section class="shadow-xl card bg-base-100">
      <div class="space-y-6 card-body">
        <div class="flex justify-between items-center">
          <h2 class="flex gap-2 items-center text-2xl font-bold">
            <Calculator class="w-6 h-6" />
            Totali
          </h2>
          <div class="flex-1 mx-4 h-px bg-gradient-to-r from-transparent to-transparent via-base-300"></div>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4 items-center sm:grid-cols-3">
            <label class="text-lg font-semibold sm:col-span-2" for="totalCost">
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

          <div class="grid grid-cols-1 gap-4 items-center sm:grid-cols-3">
            <label class="text-lg font-semibold sm:col-span-2" for="grandTotal">
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

        <div class="p-4 mt-4 rounded-md bg-base-200">
          <p class="flex gap-2 items-start text-sm">
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
